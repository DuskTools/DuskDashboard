import { Session } from '@supabase/supabase-js'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

import { AppDispatch } from '../data/actions'
import { Actions } from '~context'
import supabase from '~supabase'

WebBrowser.maybeCompleteAuthSession() // required for web only
const redirectTo = makeRedirectUri()

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)
  const { access_token, refresh_token } = params

  if (!access_token) return

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })
  if (error) throw error
  return data.session
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
    return await createSessionFromUrl(url)
  }
}

const getOauthToken = async (session: Session) => {
  const data: Record<string, string> = {
    grant_type: 'authorization_code',
    code: session.access_token,
    redirect_uri: process.env.EXPO_PUBLIC_API_CALLBACK!,
    client_id: process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID!,
    client_secret: process.env.EXPO_PUBLIC_DISCORD_CLIENT_SECRET!,
  }

  const body = Object.keys(data)
    .map((property) => {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(data[property])
      return encodedKey + '=' + encodedValue
    })
    .join('&')

  const result = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  console.log(result)
}

const handleLoginResponse = (dispatch: AppDispatch, session: Session) => {
  console.log('foo')
  Actions.setSession(dispatch, session)
  // await getOauthToken(session)
  router.push('/dashboard/')
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export default { login, handleLoginResponse, logout }
