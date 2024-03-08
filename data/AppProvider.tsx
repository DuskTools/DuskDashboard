import { PropsWithChildren, useEffect, useReducer } from 'react'

import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'
import { Actions } from '~context'
import supabase from '~supabase'

export default function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      if (event === 'INITIAL_SESSION') {
        // initial session established
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
      } else if (event === 'SIGNED_OUT') {
        Actions.setCurrentUser(dispatch, null)
        router.push('/')
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // AuthService.handleLoginResponse(dispatch, session!)
      }
    })

    // call unsubscribe to remove the callback
    return data.subscription.unsubscribe
  }, [])
  const hasCurrentUser = !!state.currentUser

  useEffect(() => {
    if (hasCurrentUser) {
      router.push('/dashboard/')
    }
  }, [hasCurrentUser])

  const isLoading = state.loading > 0

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {isLoading ? <ActivityIndicator /> : children}
    </AppContext.Provider>
  )
}
