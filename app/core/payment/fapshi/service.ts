import axios from "axios";
import { Configuration } from "~/core/configuration";
import { Database } from "~/core/database";
import { TRPCError } from "@trpc/server";

interface FapshiPaymentResponse {
  link?: string;
  transId?: string;
  message?: string;
  status?: string;
}

export class FapshiService {
  private static instance: FapshiService;
  private baseUrl: string;
  private apiUser: string;
  private apiKey: string;

  private constructor() {
    this.baseUrl = Configuration.getFapshiBaseUrl();
    this.apiUser = Configuration.getFapshiApiUser();
    this.apiKey = Configuration.getFapshiApiKey();
  }

  public static getInstance(): FapshiService {
    if (!FapshiService.instance) {
      FapshiService.instance = new FapshiService();
    }
    return FapshiService.instance;
  }

  async getWalletBalance(userId: string) {
    const wallet = await Database.wallet.findFirst({
      where: { userId },
    });

    if (!wallet) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wallet not found",
      });
    }

    return wallet;
  }

  async initiatePayment(data: {
    amount: number;
    phone: string;
    email: string;
    userId: string;
    externalId: string;
    message: string;
    name: string;
  }) {
    try {
      const response = await axios.post<FapshiPaymentResponse>(
        `${this.baseUrl}/direct-pay`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            apiuser: this.apiUser,
            apikey: this.apiKey,
          },
        }
      );

      if (!response.data.transId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to initiate payment",
        });
      }

      return {
        transactionId: response.data.transId,
        message: "Payment request initiated",
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.response.data.message,
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Payment processing failed",
      });
    }
  }

  async getPaymentStatus(transId: string) {
    try {
      const response = await axios.get<FapshiPaymentResponse>(
        `${this.baseUrl}/payment-status/${transId}`,
        {
          headers: {
            apiuser: this.apiUser,
            apikey: this.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get payment status",
      });
    }
  }

  async handleWebhook(data: {
    transId: string;
    status: string;
    medium: string;
    serviceName: string;
    amount: number;
    revenue: number;
    payerName: string;
    email: string;
    redirectUrl: string;
    externalId: string;
    userId: string;
    webhook: string;
    financialTransId: string;
    dateInitiated: string;
    dateConfirmed: string;
  }) {
    try {
      // Find and update the transaction
      const transaction = await Database.transaction.findFirst({
        where: { providerTransactionId: data.transId },
      });

      if (!transaction) {
        // If transaction not found, create it (for backward compatibility)
        await Database.transaction.create({
          data: {
            amount: data.amount.toString(),
            type: data.externalId.startsWith("payment_")
              ? "DEPOSIT"
              : data.externalId.startsWith("course_")
              ? "COURSE_PURCHASE"
              : "SUBSCRIPTION",
            status: data.status === "SUCCESSFUL" ? "SUCCESS" : "FAILED",
            providerTransactionId: data.transId,
            userId: data.userId,
          },
        });
      } else {
        // Update existing transaction
        await Database.transaction.update({
          where: { id: transaction.id },
          data: {
            status: data.status === "SUCCESSFUL" ? "SUCCESS" : "FAILED",
          },
        });
      }

      if (data.status === "SUCCESSFUL") {
        // Handle different types of payments
        if (data.externalId.startsWith("payment_")) {
          // Handle wallet deposit
          const wallet = await Database.wallet.findFirst({
            where: { userId: data.userId },
          });

          if (wallet) {
            // Check if this transaction was already processed
            const existingSuccessfulTransaction =
              await Database.transaction.findFirst({
                where: {
                  providerTransactionId: data.transId,
                  status: "SUCCESS",
                },
              });

            if (!existingSuccessfulTransaction) {
              const newBalance = (
                parseFloat(wallet.balance) + data.amount
              ).toString();
              const newTotalEarnings = (
                parseFloat(wallet.totalEarnings) + data.amount
              ).toString();

              // Update wallet balance
              await Database.wallet.update({
                where: { id: wallet.id },
                data: {
                  balance: newBalance,
                  totalEarnings: newTotalEarnings,
                },
              });

              // Create balance history record
              await Database.walletBalanceHistory.create({
                data: {
                  walletId: wallet.id,
                  amount: data.amount.toString(),
                  type: "DEPOSIT",
                  balance: newBalance,
                  transactionId: transaction?.id || undefined,
                },
              });
            }
          }
        } else if (data.externalId.startsWith("course_")) {
          // Handle course purchase
          const courseId = data.externalId.replace("course_", "");
          const existingEnrollment = await Database.userCourse.findFirst({
            where: {
              courseId,
              userId: data.userId,
            },
          });

          if (!existingEnrollment) {
            await Database.userCourse.create({
              data: {
                courseId,
                userId: data.userId,
              },
            });
          }
        } else if (data.externalId.startsWith("subscription_")) {
          // Handle subscription purchase
          const subscriptionId = data.externalId.replace("subscription_", "");
          const existingSubscription = await Database.subscription.findFirst({
            where: {
              id: subscriptionId,
              userId: data.userId,
            },
          });

          if (!existingSubscription) {
            // Create subscription with 1 month duration
            const startDate = new Date();
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 1);

            await Database.subscription.create({
              data: {
                id: subscriptionId,
                userId: data.userId,
                status: "active",
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                planType: "PREMIUM",
              },
            });

            // Update user role to PREMIUM
            await Database.user.update({
              where: { id: data.userId },
              data: { globalRole: "PREMIUM" },
            });
          }
        }
      }

      return { received: true };
    } catch (error) {
      console.error("Webhook processing error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Webhook processing failed",
      });
    }
  }
}
