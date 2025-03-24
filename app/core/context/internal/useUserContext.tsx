import { Api } from '@/core/trpc'
import { User } from '@prisma/client'
import { ReactNode, createContext, useContext } from 'react'

/**
 * @provider useUserContext
 * @description A provider to get the relevant user context
 * @attribute {(roleNames: string | string[]) => boolean} checkRole - Check if the logged user match any of the provided globalRoles
 * @attribute {boolean} isLoggedIn - Wether the user is authenticated or not
 * @attribute {User} user - The user object, user.id to access the id for example
 * @usage  const {user, checkRole} = useUserContext(); // then you can access the id, name, email like that 'const userId = user?.id'
 * @import import { useUserContext } from '@/core/context'
 */

type AuthenticationStatus = 'unauthenticated' | 'loading' | 'authenticated'

type UserContextType = {
  user: User
  checkRole: (roleNames: string | string[]) => boolean
  refetch: () => void
  authenticationStatus: AuthenticationStatus
  isLoggedIn: boolean
  isLoading: boolean
}

const UserContext = createContext<UserContextType>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: session,
    refetch,
    ...querySession
  } = Api.authentication.session.useQuery()

  const user = session?.user

  const checkRole = (roleNames: string | string[]) => {
    if (!user?.globalRole) return false
    const roles = Array.isArray(roleNames) ? roleNames : [roleNames]
    return roles.includes(user.globalRole)
  }

  const isLoading = querySession.isLoading

  const isLoggedIn = !!session?.user

  let status: AuthenticationStatus = 'unauthenticated'

  if (isLoading) {
    status = 'loading'
  } else if (isLoggedIn) {
    status = 'authenticated'
  }

  return (
    <UserContext.Provider
      value={{
        user: session?.user,
        checkRole,
        refetch,
        authenticationStatus: status,
        isLoggedIn,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
