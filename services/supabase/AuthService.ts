import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as WebBrowser from 'expo-web-browser'
import { Platform } from 'react-native'

import UserService from './UserService'
import supabase from '~supabase'

Platform.OS === 'web' && WebBrowser.maybeCompleteAuthSession()
const redirectTo = makeRedirectUri()

const createUserDetailsFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)

  const {
    access_token,
    refresh_token,
    provider_token,
    provider_refresh_token,
  } = params

  if (!access_token) return

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })

  if (error) throw error
  return {
    discord_token: provider_token,
    discord_refresh_token: provider_refresh_token,
    auth_id: data.user!.id,
    avatar_url: data.user!.user_metadata.avatar_url,
    email: data.user!.email!,
    discord_id: data.user!.user_metadata.provider_id,
  }
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

  console.log(redirectTo)
  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

  if (res.type === 'success') {
    const { url } = res
    const userParams = await createUserDetailsFromUrl(url)
    if (userParams === undefined) throw new Error('No session')
    return await UserService.updateOrCreateOnLogin(userParams)
  }
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export default { login, logout }
