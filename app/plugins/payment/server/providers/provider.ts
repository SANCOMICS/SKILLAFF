import {
  Payment,
  Product,
  WebhookResponse,
  Subscription,
} from '../payment.type'

export type BankAccount = {
  accountNumber: string
  bankCode: string
}

export type ProviderCreatePaymentLinkOptions = {
  customerId: string
  productId: string
  metadata?: Record<string, string>
  urlRedirection?: string
  phoneNumber: string
}

export interface Provider {
  createCustomer(customer: { email: string; name: string }): Promise<string>
  createPaymentLink(options: ProviderCreatePaymentLinkOptions): Promise<string>
  findManySubscriptions(customerId: string): Promise<Subscription[]>
  findManyPayments(customerId: string): Promise<Payment[]>
  findManyProducts(): Promise<Product[]>
  onPayment(body: Buffer, sig: string): Promise<WebhookResponse>
  isActive(): boolean
  withdrawFromWallet(options: {
    customerId: string
    amount: string
    phoneNumber: string
    bankAccount?: BankAccount
  }): Promise<boolean>
  getWalletBalance(customerId: string): Promise<{ balance: string }>
  depositToWallet(options: {
    customerId: string
    amount: string
    phoneNumber: string
  }): Promise<boolean>
}
