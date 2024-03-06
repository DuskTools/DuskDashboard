import { ActionType, ReducerAction } from './actions'
import { AppState } from '~types'

export default function reducer(
  state: AppState,
  action: ReducerAction
): AppState {
  console.log('Reducer called with state:', state, 'and action:', action)
  switch (action.type) {
    case ActionType.SET_SESSION:
      return {
        ...state,
        auth: { ...state.auth, session: action.payload },
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
  }
}
