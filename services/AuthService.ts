import { Session } from '@supabase/supabase-js'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

import { Actions, AppDispatch } from '~context'
import supabase from '~supabase'

WebBrowser.maybeCompleteAuthSession() // required for web only
const redirectTo = makeRedirectUri()

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)

  const { access_token, refresh_token, provider_token, provider_refresh_token } =
    params

  if (!access_token) return

  const { error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })
  if (error) throw error
  await supabase.auth.updateUser({
    data: { provider_token, provider_refresh_token },
  })

}

const login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      queryParams: { scopes: 'guilds' },
      redirectTo,
      skipBrowserRedirect: true,
    },
  })
  if (error) throw error

  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

  if (res.type === 'success') {
    const { url } = res
    createSessionFromUrl(url)
  }
}

const handleLoginResponse = (dispatch: AppDispatch, session: Session) => {
  Actions.setSession(dispatch, session)
  router.push('/dashboard/')
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export default { login, handleLoginResponse, logout }
