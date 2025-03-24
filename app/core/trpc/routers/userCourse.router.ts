import { Trpc } from '@/core/trpc/base'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const UserCourseRouter = Trpc.createRouter({
  enroll: Trpc.procedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if course exists
      const course = await ctx.database.course.findUnique({
        where: { id: input.courseId },
      })

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Course not found',
        })
      }

      // Check if user is already enrolled
      const existingEnrollment = await ctx.database.userCourse.findFirst({
        where: {
          courseId: input.courseId,
          userId: ctx.session.user.id,
        },
      })

      if (existingEnrollment) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'You are already enrolled in this course',
        })
      }

      // Create enrollment
      const enrollment = await ctx.database.userCourse.create({
        data: {
          courseId: input.courseId,
          userId: ctx.session.user.id,
        },
      })

      return {
        success: true,
        message: 'Successfully enrolled in course',
        enrollment,
      }
    }),
  create: Trpc.procedure
    .input(
      z.object({
        courseId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user exists and is admin or has active subscription
      const user = await ctx.database.user.findUnique({
        where: { id: input.userId },
        include: {
          subscriptions: {
            where: {
              status: 'active',
            },
          },
        },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const isAdmin = user.globalRole === 'ADMIN'
      const hasPremium = user.subscriptions.length > 0

      if (!isAdmin && !hasPremium) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Premium subscription required for course enrollment',
        })
      }

      // Create enrollment
      try {
        const enrollment = await ctx.database.userCourse.create({
          data: {
            courseId: input.courseId,
            userId: input.userId,
          },
        })

        return enrollment
      } catch (error) {
        if (error.code === 'P2002') {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'You are already enrolled in this course',
          })
        }
        throw error
      }
    }),
  delete: Trpc.procedure
    .input(
      z.object({
        where: z.object({
          courseId: z.string(),
          userId: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the enrollment exists
      const enrollment = await ctx.database.userCourse.findFirst({
        where: {
          courseId: input.where.courseId,
          userId: input.where.userId,
        },
      })

      if (!enrollment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Course enrollment not found',
        })
      }

      // Check if course exists
      const course = await ctx.database.course.findUnique({
        where: { id: input.where.courseId },
      })

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Course not found',
        })
      }

      await ctx.database.userCourse.deleteMany({
        where: {
          courseId: input.where.courseId,
          userId: input.where.userId,
        },
      })

      return {
        success: true,
        message: 'Course enrollment successfully deleted',
      }
    }),
})
