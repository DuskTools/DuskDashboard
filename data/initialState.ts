import { AppState } from '~types'

const initialState: AppState = {
  currentUser: null,
  db: {
    crews: null,
    clocks: null,
    characters: null,
    users: null,
  },
  authLoaded: false,
  loading: 0,
}

export default initialState
