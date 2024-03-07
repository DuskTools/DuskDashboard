import { PropsWithChildren, useEffect, useReducer } from 'react'

import { ActivityIndicator } from 'react-native-paper'

import Actions from './actions'
import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'
import AuthService from '~services/AuthService'
import supabase from '~supabase'

export default function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      if (event === 'INITIAL_SESSION') {
        Actions.hydrateAuth(dispatch, { session })
      } else if (event === 'SIGNED_IN') {
        AuthService.handleLoginResponse(dispatch, session!)
      } else if (event === 'SIGNED_OUT') {
        Actions.setSession(dispatch, null)
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    })

    // call unsubscribe to remove the callback
    return data.subscription.unsubscribe
  }, [])
  console.log('STATE', state)

  const isLoading = state.loading > 0 || !state.auth.hydrated

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {isLoading ? <ActivityIndicator /> : children}
    </AppContext.Provider>
  )
}
