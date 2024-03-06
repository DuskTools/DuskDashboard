import { useContext } from 'react'

import AppContext from './AppContext'

export default function useAppState() {
  return useContext(AppContext)
}
