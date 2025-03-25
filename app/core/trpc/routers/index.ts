import { router } from '../base'
import { updatePasswordRouter } from './updatePassword.router'
import { UserCourseRouter } from './userCourse.router'

export const appRouter = router({
  updatePassword: updatePasswordRouter,
  userCourse: UserCourseRouter,
})

export type AppRouter = typeof appRouter
