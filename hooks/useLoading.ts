import useAppContext from '../data/useAppContext'
import { Actions } from '~context'

export default function useLoading() {
  const [state, dispatch] = useAppContext()

  const isLoading = state.loading > 0
  const incrementLoading = () => Actions.incrementLoading(dispatch)
  const decrementLoading = () => Actions.decrementLoading(dispatch)

  const loadingHarness = async (callback: () => Promise<void>) => {
    incrementLoading()
    try {
      await callback()
    } finally {
      decrementLoading()
    }
  }
  return {
    isLoading,
    loadingHarness,
  }
}
