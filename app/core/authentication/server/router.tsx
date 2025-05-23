import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import Bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { z } from 'zod'
import { Configuration } from '~/core/configuration'
import { Utility } from '~/core/helpers/utility'
import { EmailServer } from '../../../plugins/email/server'
import { Trpc } from '../../trpc/base'
import { COOKIE_MAX_AGE, Cookies } from './cookies'
import { AuthenticationService } from './service'

export const AuthenticationRouter = Trpc.createRouter({
  createAdmin: Trpc.procedurePublic
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      checkPassword(input.password)
      const passwordHashed = hashPassword(input.password)

      const user = await ctx.databaseUnprotected.user.create({
        data: {
          email: 'admin@admin.com',
          password: passwordHashed,
          globalRole: 'ADMIN',
          status: 'VERIFIED',
        },
      })

      return { id: user.id }
    }),

  session: Trpc.procedure.query(async ({ ctx }) => {
    const user = await ctx.database.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
    })

    return { user }
  }),

  logout: Trpc.procedurePublic.mutation(async ({ ctx }) => {
    Cookies.delete(ctx.responseHeaders, 'MARBLISM_ACCESS_TOKEN')

    ctx.responseHeaders.set('Location', '/')

    return {
      success: true,
      redirect: '/',
    }
  }),

  login: Trpc.procedurePublic
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Log authentication attempt
        console.log(`Authentication attempt for email: ${input.email}`)

        let user
        try {
          user = await ctx.databaseUnprotected.user.findUnique({
            where: { email: input.email },
          })
        } catch (error) {
          console.log(`Failed login attempt - user not found: ${input.email}`)
          return {
            success: false,
            code: 'USER_NOT_FOUND',
            redirect: '/login?error=UserNotFound',
          }
        }

        if (!user) {
          console.log(`Failed login attempt - user not found: ${input.email}`)
          return {
            success: false,
            code: 'USER_NOT_FOUND',
            redirect: '/login?error=UserNotFound',
          }
        }

        if (user.status !== 'VERIFIED') {
          console.log(
            `Failed login attempt - user not verified: ${input.email}`,
          )
          return {
            success: false,
            code: 'USER_NOT_VERIFIED',
            redirect: '/login?error=UserNotVerified',
          }
        }

        const isValid = await Bcrypt.compare(input.password, user.password)

        if (!isValid) {
          console.log(`Failed login attempt - invalid password: ${input.email}`)
          return {
            success: false,
            code: 'INVALID_CREDENTIALS',
            redirect: '/login?error=CredentialsSignin',
          }
        }

        const secret = Configuration.getAuthenticationSecret()

        const jwtToken = Jwt.sign({ userId: user.id }, secret, {
          expiresIn: COOKIE_MAX_AGE,
        })

        Cookies.set(ctx.responseHeaders, 'MARBLISM_ACCESS_TOKEN', jwtToken)

        console.log(`Successful login for user: ${input.email}`)
        return {
          success: true,
          code: 'SUCCESS',
          redirect: '/skillfeed',
        }
      } catch (error) {
        console.error(`Login error for ${input.email}:`, error)
        return {
          success: false,
          code: 'INTERNAL_ERROR',
          redirect: '/login?error=default',
        }
      }
    }),

    register: Trpc.procedurePublic
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        pictureUrl: z.string().optional(),
        password: z.string(),
        globalRole: z
          .string()
          .refine(value => value !== 'ADMIN', {
            message: 'globalRole cannot be ADMIN',
          })
          .optional(),
        tokenInvitation: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      checkPassword(input.password);
  
      const payload = checkTokenInvitation(input.tokenInvitation);
  
      const email = input.email.trim().toLowerCase();
      const ppw = input.password; // Store the unhashed password
  
      let user: User;
  
      if (payload?.userId) {
        user = await ctx.databaseUnprotected.user.findUnique({
          where: { id: payload.userId, status: 'INVITED' },
        });
  
        if (!user) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User was not found',
          });
        }
      } else {
        const userExisting = await ctx.databaseUnprotected.user.findUnique({
          where: { email },
        });
  
        if (userExisting) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email is not available',
          });
        }
      }
  
      const passwordHashed = hashPassword(ppw); // Hash the password
  
      if (user) {
        user = await ctx.databaseUnprotected.user.update({
          where: { id: user.id },
          data: { ...input, password: passwordHashed, status: 'VERIFIED' },
        });
      } else {
        user = await ctx.databaseUnprotected.user.create({
          data: {
            email: input.email,
            name: input.name,
            pictureUrl: input.pictureUrl,
            password: passwordHashed,
          },
        });
      }
  
      await AuthenticationService.onRegistration(ctx, user.id, ppw); // Send unhashed password as ppw
  
      return { id: user.id, ppw }; // Include ppw in response so it can be used in the service
    }),
  

    updatePassword: Trpc.procedure
    .input(z.object({
      userId: z.string(),
      currentPassword: z.string(),
      newPassword: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { userId, currentPassword, newPassword } = input
      // Implement the password update logic here
      // You should retrieve the user from the database by userId,
      // validate the current password, and update it with the new password.
      
      // Example:
      const user = await ctx.databaseUnprotected.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const isValid = await Bcrypt.compare(currentPassword, user.password)

      if (!isValid) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Current password is incorrect',
        })
      }

      const passwordHashed = hashPassword(newPassword)

      await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: { password: passwordHashed },
      })

      return { success: true }
    }),

    

  sendResetPasswordEmail: Trpc.procedurePublic
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const email = input.email.trim().toLowerCase()

      const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
        where: { email },
      })

      const payload = { userId: user.id }

      const secret = Configuration.getAuthenticationSecret()

      const TIME_24_HOURS = 60 * 60 * 24

      const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS })

      const url = Configuration.getBaseUrl()

      const urlResetPassword = `${url}/reset-password/${token}`

      try {
        await EmailServer.service.send({
          templateKey: 'resetPassword',
          email: user.email,
          name: user.name ?? user.email,
          subject: `Reset your password`,
          variables: {
            url_password_reset: urlResetPassword,
          },
        })

        return { success: true }
      } catch (error) {
        console.error(error.message)

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not send the email',
        })
      }
    }),

  resetPassword: Trpc.procedurePublic
    .input(z.object({ token: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      checkPassword(input.password)

      const secret = Configuration.getAuthenticationSecret()

      let decoded: { userId: string }

      try {
        decoded = Jwt.verify(input.token, secret) as { userId: string }
      } catch (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token is invalid',
        })
      }

      const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
        where: { id: decoded.userId },
      })

      const passwordHashed = hashPassword(input.password)

      await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: {
          password: passwordHashed,
        },
      })

      return { success: true }
    }),
})


const checkPassword = (password: string) => {
  const isValid = password?.length >= 6

  if (isValid) {
    return
  }

  throw new TRPCError({
    code: 'BAD_REQUEST',
    message: 'Password must have at least 6 characters.',
  })
}

const checkTokenInvitation = (token?: string) => {
  if (Utility.isNull(token)) {
    return
  }

  const secret = Configuration.getAuthenticationSecret()

  let decoded: { userId: string }

  try {
    decoded = Jwt.verify(token, secret) as { userId: string }
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token is invalid',
    })
  }

  return decoded
}

const hashPassword = (password: string) => {
  const saltRounds = 10
  const salt = Bcrypt.genSaltSync(saltRounds)
  const passwordHashed = Bcrypt.hashSync(password, salt)

  return passwordHashed
}
