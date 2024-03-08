import { AppState } from '~types'

const initialState: AppState = {
  currentUser: null,
  users: [],
  campaigns: [],
  clocks: [],
  loading: 0,
}

export default initialState
