import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as WebBrowser from 'expo-web-browser'

import { supabaseAnon } from '~supabase'

WebBrowser.maybeCompleteAuthSession() // required for web only
const redirectTo = makeRedirectUri()

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)
  const { access_token, refresh_token } = params

  if (!access_token) return

  const { data, error } = await supabaseAnon.auth.setSession({
    access_token,
    refresh_token,
  })
  if (error) throw error
  return data.session
}

const login = async () => {
  const { data, error } = await supabaseAnon.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  })
  if (error) throw error

  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

  if (res.type === 'success') {
    const { url } = res
    return await createSessionFromUrl(url)
  }
}

const logout = async () => {
  const { error } = await supabaseAnon.auth.signOut()
  if (error) throw error
}

export default { login, logout }
