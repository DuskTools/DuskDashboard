import { PropsWithChildren, useEffect, useReducer } from 'react'

import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'
import { Actions } from '~context'
import { supabaseAnon } from '~supabase'

export default function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { data } = supabaseAnon.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        Actions.setSession(dispatch, session)
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
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
