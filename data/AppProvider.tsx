import { PropsWithChildren, useEffect, useReducer } from 'react'

import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'
import AuthService from '~services/supabase/AuthService'
import DBSubscriptionService from '~services/supabase/DBSubscriptionService'
import supabase from '~supabase'

export default function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      AuthService.onAuthSessionChangeFactory(dispatch)
    )

    return data.subscription.unsubscribe
  }, [])

  useEffect(() => {
    const subscription = DBSubscriptionService.subscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
