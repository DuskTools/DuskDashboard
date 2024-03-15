import useLoading from './useLoading'
import AuthService from '~services/supabase/AuthService'

export default function useAuth() {
  const { loadingHarness } = useLoading()

  return {
    logout: async () => {
      await loadingHarness(async () => {
        await AuthService.logout()
      })
    },
    login: async () => {
      await loadingHarness(async () => {
        await AuthService.login()
      })
    },
  }
}
