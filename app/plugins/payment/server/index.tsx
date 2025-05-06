import { BillingRouter } from './billing.router'

export namespace PaymentServer {
  export const trpcRouter = BillingRouter
}

export * from './payment.type'
