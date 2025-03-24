import { AuthenticationServer } from '~/core/authentication/server'
import { Trpc } from '~/core/trpc/base'
import { TRPCError } from '@trpc/server'

type PublicVariables = {
  authenticationProviders: { name: string }[]
  [key: string]: any
}

const validateFlutterwaveKeys = () => {
  const requiredKeys = ['FLW_PUBLIC_KEY', 'FLW_SECRET_KEY', 'FLW_ENCRYPTION_KEY']
  const missingKeys = requiredKeys.filter(key => !process.env[key])

  if (missingKeys.length > 0) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Missing required Flutterwave environment variables: ${missingKeys.join(', ')}`,
    })
  }
}

export const trpcRouter = Trpc.createRouter({
  getPublic: Trpc.procedurePublic.query(async (): Promise<PublicVariables> => {
    const variables = process.env ?? {}

    validateFlutterwaveKeys()

    const authenticationProviders = AuthenticationServer.getProviders().map(
      provider => ({ name: provider.name }),
    )

    const variablesPublic: PublicVariables = {
      authenticationProviders,
      FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
      FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
      FLW_ENCRYPTION_KEY: process.env.FLW_ENCRYPTION_KEY,
    }

    for (const [key, value] of Object.entries(variables)) {
      const isPublic = key.startsWith('PUBLIC_')

      if (isPublic) {
        variablesPublic[key] = value
      }
    }

    return variablesPublic
  }),
})

export const ConfigurationServer = {
  trpcRouter,
}
