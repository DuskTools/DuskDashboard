import { AppState } from '~types'

const initialState: AppState = {
  currentUser: null,
  db: {
    campaigns: null,
    clocks: null,
    campaignUsers: null,
  },
  authLoaded: false,
  loading: 0,
}

export default initialState
