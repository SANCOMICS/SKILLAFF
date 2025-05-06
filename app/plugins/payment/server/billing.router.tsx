import { Configuration } from '@/core/configuration'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { PaymentService } from './payment.service'

/**
 * @provider BillingApi
 * @description API for payment operations using Fapshi
 * @function processWithdrawal - Processes withdrawal to mobile money
 * @function getWalletBalance - Gets current wallet balance
 * @function initiateDeposit - Initiates deposit to wallet via mobile money
 * @usage `const api = Api.billing`
 */

export const BillingRouter = Trpc.createRouter({
  getWalletBalance: Trpc.procedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      return PaymentService.getWalletBalance(user)
    }),

  initiateDeposit: Trpc.procedure
    .input(z.object({ 
      amount: z.string(),
      phoneNumber: z.string()
        .regex(/^(237|\+237)?[6-9][0-9]{8}$/, 'Invalid Cameroon phone number')
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      return PaymentService.depositToWallet(user, input.amount, input.phoneNumber)
    }),

  processWithdrawal: Trpc.procedure
    .input(
      z.object({
        amount: z.string(),
        phoneNumber: z.string()
          .regex(/^(237|\\+237)?[6-9][0-9]{8}$/, 'Veuillez entrer un numéro de téléphone Camerounais valide')
      }).required()
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session?.user?.id
        const user = await ctx.database.user.findFirstOrThrow({
          where: { id: userId },
        })

        // Process withdrawal
        return PaymentService.withdrawFromWallet({
          customerId: user.id,
          amount: input.amount,
          phoneNumber: input.phoneNumber
        })
      } catch (error) {
        throw new TRPCError({
          code: error.code || 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Le retrait Mobile Money a échoué. Veuillez réessayer.'
        })
      }
    }),

  getReferralCommissions: Trpc.procedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id
      const referrals = await ctx.database.referral.findMany({
        where: { referrerId: userId },
        include: {
          transactions: {
            select: {
              amount: true,
              id: true,
              type: true,
              status: true,
              referralId: true,
            },
          },
        },
      })

      return referrals
        .reduce((total, referral) => {
          const commission = referral.transactions.reduce((sum, tx) => {
            if (tx.type === 'REFERRAL' && tx.status === 'COMPLETED') {
              return sum + parseFloat(tx.amount || '0') * 0.1 // 10% commission
            }
            return sum
          }, 0)
          return total + commission
        }, 0)
        .toString()
    }),

  findManyProducts: Trpc.procedurePublic.input(z.object({})).query(async () => {
    return []
  }),

  findManyPayments: Trpc.procedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      return PaymentService.findManyPayments(user)
    }),

  findManySubscriptions: Trpc.procedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      return PaymentService.findManySubscriptions(user)
    }),

  createPaymentLink: Trpc.procedure
    .input(
      z.object({
        productId: z.string(),
        phoneNumber: z.string()
          .regex(/^(237|\\+237)?[6-9][0-9]{8}$/, 'Veuillez entrer un numéro de téléphone Camerounais valide')
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      const url = await PaymentService.createPaymentLink({
        user,
        productId: input.productId,
        metadata: {
          userId: user.id,
        },
        urlRedirection: Configuration.getBaseUrl(),
        phoneNumber: input.phoneNumber
      })

      return { url }
    }),
})
