import { AppState } from '~types'

const initialState: AppState = {
  currentUser: null,
  campaigns: [],
  authLoaded: false,
  loading: 0,
}

export default initialState
