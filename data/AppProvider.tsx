import { PropsWithChildren, useEffect, useReducer, useState } from 'react'

import { useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'
import { Actions } from '~context'
import useAuth from '~hooks/useAuth'
import UserService from '~services/supabase/UserService'
import supabase from '~supabase'

export default function AppProvider({ children }: PropsWithChildren) {
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      if (event === 'INITIAL_SESSION') {
        setSessionLoaded(true)
      } else if (event === 'SIGNED_IN') {
        Actions.incrementLoading(dispatch)
        UserService.find({ auth_id: session!.user.id })
          .then((user) => {
            console.log(user)
            if (user) {
              Actions.setCurrentUser(dispatch, user)
            } else {
              logout()
            }
          })
          .finally(() => {
            Actions.decrementLoading(dispatch)
          })
      } else if (event === 'SIGNED_OUT') {
        Actions.setCurrentUser(dispatch, null)
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

  useEffect(() => {
    if (state.currentUser) {
      router.push('/dashboard/')
    }
  }, [state.currentUser])

  const isLoading = state.loading > 0 || !sessionLoaded

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {isLoading ? <ActivityIndicator /> : children}
    </AppContext.Provider>
  )
}
