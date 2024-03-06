import { createContext } from 'react'

import { AppDispatch } from './actions'
import initialState from './initialState'
import { AppState } from '~types'

const AppContext = createContext<[AppState, AppDispatch]>([
  initialState,
  () => {},
])

export default AppContext
