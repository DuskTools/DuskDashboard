import useLoading from './useLoading'
import { Actions, useAppContext } from '~context'
import AuthService from '~services/supabase/AuthService'

export default function useAuth() {
  const [, dispatch] = useAppContext()
  const { loadingHarness } = useLoading()

  return {
    logout: async () => {
      await loadingHarness(async () => {
        await AuthService.logout()
        Actions.setCurrentUser(dispatch, null)
      })
    },
    login: async () => {
      await loadingHarness(async () => {
        const user = await AuthService.login()
        Actions.setCurrentUser(dispatch, user || null)
      })
    },
  }
}
