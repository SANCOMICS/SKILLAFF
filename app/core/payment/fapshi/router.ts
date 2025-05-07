import { z } from "zod";
import { Trpc } from "~/core/trpc/base";
import { FapshiService } from "./service";

export const FapshiRouter = Trpc.createRouter({
  initiatePayment: Trpc.procedure
    .input(
      z.object({
        amount: z.number(),
        phone: z.string(),
        message: z.string().optional(),
        type: z.enum(["DEPOSIT", "COURSE_PURCHASE", "SUBSCRIPTION"]),
        referenceId: z.string().optional(), // courseId or subscriptionId
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.database.user.findUniqueOrThrow({
        where: { id: ctx.session.user.id },
      });

      // Generate external ID based on payment type
      let externalId = "";
      if (input.type === "DEPOSIT") {
        externalId = `payment_${Date.now()}`;
      } else if (input.type === "COURSE_PURCHASE" && input.referenceId) {
        externalId = `course_${input.referenceId}`;
      } else if (input.type === "SUBSCRIPTION" && input.referenceId) {
        externalId = `subscription_${input.referenceId}`;
      }

      return FapshiService.getInstance().initiatePayment({
        amount: input.amount,
        phone: input.phone,
        email: user.email || "",
        userId: user.id,
        externalId,
        message: input.message || `${input.type} payment`,
        name: user.name || user.email || "",
      });
    }),

  getPaymentStatus: Trpc.procedure
    .input(z.object({ transId: z.string() }))
    .query(async ({ input }) => {
      return FapshiService.getInstance().getPaymentStatus(input.transId);
    }),

  handleWebhook: Trpc.procedurePublic
    .input(
      z.object({
        transId: z.string(),
        status: z.string(),
        medium: z.string(),
        serviceName: z.string(),
        amount: z.number(),
        revenue: z.number(),
        payerName: z.string(),
        email: z.string(),
        redirectUrl: z.string(),
        externalId: z.string(),
        userId: z.string(),
        webhook: z.string(),
        financialTransId: z.string(),
        dateInitiated: z.string(),
        dateConfirmed: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return FapshiService.getInstance().handleWebhook(input);
    }),
});
