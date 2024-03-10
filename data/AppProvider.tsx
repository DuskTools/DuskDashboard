import { PropsWithChildren, useEffect, useReducer } from 'react'

import Actions from './actions'
import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'
import Logger from '~services/Logger'
import CampaignService from '~services/supabase/CampaignService'
import UserService from '~services/supabase/UserService'
import supabase from '~supabase'

export default function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      Logger.log(event, session)

      if (event === 'INITIAL_SESSION') {
        Actions.setAuthLoaded(dispatch)
      } else if (event === 'SIGNED_IN') {
        Actions.incrementLoading(dispatch)
        UserService.find({ auth_id: session!.user.id })
          .then((user) => {
            if (user) {
              Actions.setCurrentUser(dispatch, user)
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
    const processUser = async () => {
      if (state.currentUser) {
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
  }, [state.currentUser])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
