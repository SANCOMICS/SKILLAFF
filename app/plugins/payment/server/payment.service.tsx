import { User } from '@prisma/client'
import { Payment, Product, Subscription } from './payment.type'
import { FapshiService } from '@/core/payment/fapshi/service'
import { Database } from '@/core/database'

interface PaymentService {
  getCustomerId(user: User): string
  withdrawFromWallet(options: {
    customerId: string
    amount: string
    phoneNumber: string
  }): Promise<void>
}

class Service implements PaymentService {
  private provider = FapshiService.getInstance()

  isActive(): boolean {
    return true // Fapshi is always active if configured
  }

  getCustomerId(user: User): string {
    return user.id
  }

  async getWalletBalance(user: User): Promise<string> {
    const wallet = await this.provider.getWalletBalance(user.id)
    return wallet.balance
  }

  async depositToWallet(user: User, amount: string, phoneNumber: string): Promise<string> {
    const result = await this.provider.initiatePayment({
      userId: user.id,
      amount: parseFloat(amount),
      phone: phoneNumber,
      email: user.email || '',
      externalId: `deposit_${Date.now()}`,
      message: 'Wallet deposit',
      name: user.name || 'User'
    })

    // Create transaction record
    await Database.transaction.create({
      data: {
        amount: amount,
        type: 'DEPOSIT',
        status: 'PENDING',
        providerTransactionId: result.transactionId,
        userId: user.id,
      },
    })

    return result.transactionId
  }

  async withdrawFromWallet(options: {
    customerId: string
    amount: string
    phoneNumber: string
  }): Promise<void> {
    const result = await this.provider.initiatePayment({
      userId: options.customerId,
      amount: parseFloat(options.amount),
      phone: options.phoneNumber,
      email: '', // We'll need to get this from the user
      externalId: `withdrawal_${Date.now()}`,
      message: 'Wallet withdrawal',
      name: 'User' // We'll need to get this from the user
    })

    // Create transaction record
    await Database.transaction.create({
      data: {
        amount: options.amount,
        type: 'WITHDRAWAL',
        status: 'PENDING',
        providerTransactionId: result.transactionId,
        userId: options.customerId,
      },
    })
  }

  async findManyProducts(): Promise<Product[]> {
    return []
  }

  async findManySubscriptions(customer: User): Promise<Subscription[]> {
    return []
  }

  async findManyPayments(user: User): Promise<Payment[]> {
    return []
  }

  async createPaymentLink(options: {
    user: User
    productId: string
    metadata?: Record<string, string>
    urlRedirection?: string
    phoneNumber: string
  }): Promise<string> {
    const payment = await this.provider.initiatePayment({
      userId: options.user.id,
      amount: parseFloat(options.productId), // Using productId as amount since we don't have products in Fapshi
      phone: options.phoneNumber,
      email: options.user.email || '',
      externalId: `payment_${Date.now()}`,
      message: 'Product payment',
      name: options.user.name || 'User'
    })
    return payment.transactionId
  }
}

class Singleton {
  static service = new Service()
}

export const PaymentService = Singleton.service
