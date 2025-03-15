export type WebhookResponse = {
  userId?: string
  customerId?: string
}

export type Subscription = {
  productId: string
  dateExpired: string
  status: string
}

export type Payment = {
  productId: string
  amount: number
  currency: string
  date: string
}

export enum ProductType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  ONE_TIME = 'ONE_TIME',
}

export type Product = {
  id: string
  type: ProductType
  name: string
  price: number
  description: string
  interval?: string
  coverUrl?: string
  currency: string
}
