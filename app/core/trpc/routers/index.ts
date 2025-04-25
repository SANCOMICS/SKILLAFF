import { Trpc } from '../base'; // Import your custom Trpc setup
import { updatePasswordRouter } from './updatePassword.router';
import { UserCourseRouter } from './userCourse.router';
import { z } from 'zod';
import { AuthenticationService } from '@/core/authentication/server/service';

export const appRouter = Trpc.createRouter({
  updatePassword: updatePasswordRouter,
  userCourse: UserCourseRouter,

  register: Trpc.procedurePublic
    .input(z.object({ email: z.string().email(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Call registerUser from AuthenticationService
      return await AuthenticationService.register(ctx, input.email, input.name);
    }),
});

export type AppRouter = typeof appRouter;
