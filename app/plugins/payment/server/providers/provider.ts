import {
  Payment,
  Product,
  WebhookResponse,
  Subscription,
} from "../payment.type";

export type BankAccount = {
  accountNumber: string;
  bankCode: string;
};

export type ProviderCreatePaymentLinkOptions = {
  userId: string;
  amount: number;
  phone: string;
  email: string;
  externalId: string;
  message: string;
  name: string;
};

export interface Provider {
  initiatePayment(options: ProviderCreatePaymentLinkOptions): Promise<{
    transactionId: string;
    message: string;
  }>;
  getPaymentStatus(transId: string): Promise<{
    status: string;
    message?: string;
  }>;
  handleWebhook(data: WebhookResponse): Promise<{ received: boolean }>;
  getWalletBalance(userId: string): Promise<{ balance: string }>;
  isActive(): boolean;
  withdrawFromWallet(options: {
    customerId: string;
    amount: string;
    phoneNumber: string;
    bankAccount?: BankAccount;
  }): Promise<boolean>;
  depositToWallet(options: {
    customerId: string;
    amount: string;
    phoneNumber: string;
  }): Promise<boolean>;
}
