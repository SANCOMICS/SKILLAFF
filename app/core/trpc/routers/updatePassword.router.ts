import { router, protectedProcedure } from '../base'
import { z } from 'zod'

export const updatePasswordRouter = router({
  update: protectedProcedure
    .input(
      z.object({
        oldPassword: z.string(),
        newPassword: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { oldPassword, newPassword } = input

      const user = await ctx.database.user.findUnique({
        where: { id: ctx.session.userId },
      })

      if (!user || user.password !== oldPassword) {
        throw new Error('Incorrect old password!')
      }

      await ctx.database.user.update({
        where: { id: ctx.session.userId },
        data: { password: newPassword },
      })

      return { success: true }
    }),
})
