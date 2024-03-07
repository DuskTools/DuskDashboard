import { AppState } from '~types'

const initialAuthData = {
  session: null,
  hydrated: false,
}

const initialState: AppState = {
  auth: initialAuthData,
  loading: 0,
}

export default initialState
