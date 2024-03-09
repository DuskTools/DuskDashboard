import { router } from 'expo-router'

import { Actions, useAppContext } from '~context'
import AuthService from '~services/AuthService'

export default function useAuth() {
  const [, dispatch] = useAppContext()

  return {
    logout: async () => {
      await AuthService.logout()
      Actions.setCurrentUser(dispatch, null)
      router.push('/')
    },
    login: async () => {
      const user = await AuthService.login()
      Actions.setCurrentUser(dispatch, user || null)
      router.push('/dashboard/')
    },
  }
}
