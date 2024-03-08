import { AppState } from '~types'

const initialAuthData = {
  session: null,
  hydrated: false,
}

const initialState: AppState = {
  store: {
    current_user: null,
    users: [],
    campaigns: [],
    clocks: [],
  },
  auth: initialAuthData,
  loading: 0,
}

export default initialState
