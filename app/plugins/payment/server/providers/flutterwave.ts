import { TRPCError } from '@trpc/server'
import Flutterwave from 'flutterwave-node-v3'
import { Payment, Product, Subscription } from '../payment.type'
import { Provider, ProviderCreatePaymentLinkOptions } from './provider'

export const COMMISSION_PERCENTAGE = 0.5

export class FlutterwaveProvider implements Provider {
  private flw: Flutterwave

  constructor() {
    const publicKey = process.env.FLW_PUBLIC_KEY
    const secretKey = process.env.FLW_SECRET_KEY
    const encryptionKey = process.env.FLW_ENCRYPTION_KEY

    if (!publicKey || !secretKey || !encryptionKey) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Missing required Flutterwave configuration keys',
      })
    }

    if (!publicKey.startsWith('FLWPUBK-')) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Invalid Flutterwave public key format',
      })
    }

    if (!secretKey.startsWith('FLWSECK-')) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Invalid Flutterwave secret key format',
      })
    }

    this.flw = new Flutterwave(publicKey, secretKey)
  }

  isActive(): boolean {
    return true
  }

  async createCustomer(customer: {
    email: string
    name: string
  }): Promise<string> {
    // Flutterwave doesn't have explicit customer creation
    // Use email as customer ID
    return customer.email
  }

  async createPaymentLink(
    options: ProviderCreatePaymentLinkOptions,
  ): Promise<string> {
    const payload = {
      tx_ref: `tx-${Date.now()}`,
      amount: '100', // Get from product
      currency: 'XAF',
      redirect_url: options.urlRedirection || 'https://example.com',
      customer: {
        email: options.customerId,
      },
      meta: options.metadata,
      customizations: {
        title: 'Paiement Mobile Money',
        description: 'Paiement par Mobile Money',
      },
      payment_type: 'mobilemoneyfr',
      country: 'CM',
      phone_number: options.phoneNumber
    }

    const response = await this.flw.MobileMoney.charge(payload)
    if (!response.status || response.status !== 'success') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Le paiement Mobile Money a échoué. Veuillez réessayer.',
      })
    }
    return response.data.link
  }

  async findManySubscriptions(customerId: string): Promise<Subscription[]> {
    // Flutterwave doesn't have built-in subscription management
    return []
  }

  async findManyPayments(customerId: string): Promise<Payment[]> {
    const transactions = await this.flw.Transaction.fetch({
      customer_email: customerId,
    })

    return transactions.data.map(tx => ({
      id: tx.id.toString(),
      amount: tx.amount.toString(),
      currency: tx.currency,
      status: tx.status,
      created: new Date(tx.created_at).toISOString(),
    }))
  }

  async findManyProducts(): Promise<Product[]> {
    // Implement product management in your application
    return []
  }

  async onPayment(body: Buffer, sig: string): Promise<any> {
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH
    const payload = JSON.parse(body.toString())

    const isValid = this.flw.Webhook.verifyWebhook(sig, secretHash)

    if (!isValid) {
      throw new Error('Invalid webhook signature')
    }

    return {
      userId: payload.data.meta?.userId,
      customerId: payload.data.customer.email,
      transactionRef: payload.data.tx_ref,
      amount: payload.data.amount,
    }
  }

  async getReferralCommission(amount: string): Promise<string> {
    const commission = parseFloat(amount) * COMMISSION_PERCENTAGE
    return commission.toString()
  }


  async getWalletBalance(customerId: string): Promise<{ balance: string }> {
    // Flutterwave doesn't have direct wallet balance endpoint
    return { balance: '0' }
  }

  async depositToWallet(options: {
    customerId: string
    amount: string
    phoneNumber: string
  }): Promise<boolean> {
    const payload = {
      tx_ref: `withdrawal-${Date.now()}`,
      amount: options.amount,
      currency: 'XAF',
      customer: { email: options.customerId },
      payment_type: 'mobilemoneyfr',
      country: 'CM',
      phone_number: options.phoneNumber
    }
    try {
      const response = await this.flw.MobileMoney.charge(payload)
      if (!response.status || response.status !== 'success') {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Le dépôt Mobile Money a échoué. Veuillez réessayer.',
        })
      }
      return true
    } catch (error) {
      console.error('Flutterwave API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      const errorCode = error.response?.data?.code
      const errorMessage = {
        'INSUFFICIENT_FUNDS': 'Solde insuffisant pour effectuer le dépôt',
        'INVALID_PHONE': 'Numéro de téléphone invalide', 
        'NETWORK_ERROR': 'Erreur réseau, veuillez réessayer'
      }[errorCode] || 'Le dépôt Mobile Money a échoué. Veuillez réessayer.'
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: errorMessage,
      })
    }
  }

  async withdrawFromWallet(options: {
    customerId: string
    amount: string
    phoneNumber: string
  }): Promise<boolean> {
    const payload = {
      tx_ref: `withdrawal-${Date.now()}`,
      amount: options.amount,
      currency: 'XAF',
      customer: { email: options.customerId },
      payment_type: 'mobilemoneyfr',
      country: 'CM',
      phone_number: options.phoneNumber
    }
    const response = await this.flw.MobileMoney.charge(payload)
    if (!response.status || response.status !== 'success') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Le retrait Mobile Money a échoué. Veuillez réessayer.',
      })
    }
    return true
  }
}
