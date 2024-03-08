import { Actions, useAppContext } from '~context'
import AuthService from '~services/AuthService'

export default function useLogin() {
  const [, dispatch] = useAppContext()

  return async () => {
    const user = await AuthService.login()
    Actions.setCurrentUser(dispatch, user || null)
  }
}
