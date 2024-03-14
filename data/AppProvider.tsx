import { PropsWithChildren, useEffect, useReducer } from 'react'

import Actions from './actions'
import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'
import AuthService from '~services/supabase/AuthService'
import CampaignService from '~services/supabase/CampaignService'
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
    const allChanges = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        (payload) => {
          console.log(payload)
        }
      )
      .subscribe()

    return () => {
      allChanges.unsubscribe()
    }
  }, [])

  const userPresent = !!state.currentUser
  useEffect(() => {
    const processUser = async () => {
      if (userPresent) {
        try {
          Actions.incrementLoading(dispatch)
          const campaigns = await CampaignService.campaignsForUser(
            state.currentUser!
          )
          Actions.setCampaigns(dispatch, campaigns)
        } finally {
          Actions.decrementLoading(dispatch)
        }
      }
    }
    processUser()
  }, [userPresent])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
