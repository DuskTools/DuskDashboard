import { AppState } from '~types'

const initialAuthData = {
  hydrated: false,
  session: null,
}


const initialState: AppState = {
  auth: initialAuthData,
  loading: 0,
}

export default initialState