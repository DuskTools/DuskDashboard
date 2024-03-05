import { AppState } from './types'

const initialAuthData = {
  hydrated: false,
  user: null,
}


const initialState: AppState = {
  auth: initialAuthData,
}

export default initialState
