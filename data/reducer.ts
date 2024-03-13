import { ActionType, ReducerAction } from './actions'
import initialState from './initialState'
import Logger from '~services/Logger'
import { AppState } from '~types'

export default function reducer(
  state: AppState,
  action: ReducerAction
): AppState {
  Logger.log('Reducer called with state:', state, 'and action:', action)
  switch (action.type) {
    case ActionType.ADD_CLOCK:
      if (state.campaigns === null) {
        return state
      }
      return {
        ...state,
        campaigns: state.campaigns.map((c) => {
          if (c.id === action.payload.campaign.id) {
            return {
              ...c,
              clocks: [...c.clocks, action.payload.clock],
            }
          }
          return c
        }),
      }
    case ActionType.UPDATE_CLOCK_STORE:
      if (state.campaigns === null) {
        return state
      }
      return {
        ...state,
        campaigns: state.campaigns.map((c) => {
          if (c.id === action.payload.campaign.id) {
            return {
              ...c,
              clocks: c.clocks.map((cl) => {
                if (cl.id === action.payload.clock.id) {
                  return action.payload.clock
                }
                return cl
              }),
            }
          }
          return c
        }),
      }
    case ActionType.SET_AUTH_LOADED:
      return {
        ...state,
        authLoaded: true,
      }
    case ActionType.SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
      }
    case ActionType.SET_CURRENT_USER:
      if (action.payload) {
        return {
          ...state,
          currentUser: action.payload,
        }
      }
      return {
        ...state,
        currentUser: initialState.currentUser,
        campaigns: [],
      }
    case ActionType.INCREMENT_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
      }
    case ActionType.DECREMENT_LOADING:
      return {
        ...state,
        loading: state.loading - 1,
      }
    default:
      throw new Error('Invalid action type')
  }
}
