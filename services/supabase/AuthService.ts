import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as WebBrowser from 'expo-web-browser'
import { Platform } from 'react-native'

import LoginPayloadService from './LoginPayloadService'
import UserService from './UserService'
import { AppDispatch } from '../../data/actions'
import { Actions } from '~context'
import Logger from '~services/Logger'
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
    ...extractUserDetailsFromSessionUser(data.user!),
  }
}

const handleSession = async (
  dispatch: AppDispatch,
  session: Session | null
) => {
  Actions.incrementLoading(dispatch)
  try {
    if (session) {
      const userParams = extractUserDetailsFromSessionUser(session.user)
      const user = await UserService.updateOrCreateOnLogin(userParams)
      await LoginPayloadService.onLogin(userParams)
      Actions.setCurrentUser(dispatch, user)
    } else {
      Actions.setCurrentUser(dispatch, null)
    }
  } finally {
    Actions.decrementLoading(dispatch)
  }
}

const onAuthSessionChangeFactory = (dispatch: AppDispatch) => {
  return (event: AuthChangeEvent, session: Session | null) => {
    Logger.log(event, session)
    if (event === 'INITIAL_SESSION') {
      Actions.setAuthLoaded(dispatch)
      handleSession(dispatch, session)
    } else if (event === 'SIGNED_IN') {
      handleSession(dispatch, session)
    } else if (event === 'SIGNED_OUT') {
      Actions.setCurrentUser(dispatch, null)
      // } else if (event === 'PASSWORD_RECOVERY') {
      //   // handle password recovery event
      // } else if (event === 'TOKEN_REFRESHED') {
      //   // handle token refreshed event
      // } else if (event === 'USER_UPDATED') {
      //   // AuthService.handleLoginResponse(dispatch, session!)
    }
  }
}

const extractUserDetailsFromSessionUser = (user: User) => {
  return {
    auth_id: user!.id,
    avatar_url: user!.user_metadata.avatar_url,
    email: user!.email!,
    discord_id: user!.user_metadata.provider_id,
  }
}

const login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
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
    const userParams = await createUserDetailsFromUrl(url)
    if (userParams === undefined) throw new Error('No session')
    return await UserService.updateOrCreateOnLogin(userParams)
  }
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export default { login, logout, onAuthSessionChangeFactory }
