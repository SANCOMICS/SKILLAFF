export type WebhookResponse = {
  userId: string
  transId: string
  status: string
  amount: number
  medium: string
  serviceName: string
  revenue: number
  payerName: string
  email: string
  redirectUrl: string
  externalId: string
  webhook: string
  financialTransId: string
  dateInitiated: string
  dateConfirmed: string
}

export type Subscription = {
  id: string
  status: string
  startDate: string
  endDate: string
}

export type Payment = {
  id: string
  amount: string
  type: string
  status: string
  providerTransactionId: string
  createdAt: string
}

export enum ProductType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  ONE_TIME = 'ONE_TIME',
}

export type Product = {
  id: string
  name: string
  price: string
  description: string
}
