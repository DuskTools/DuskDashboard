import { useGlobalSearchParams } from 'expo-router'

import useAppContext from '~context/useAppContext'
import { CrewAppUser } from '~types'

export default function useCurrentCrewAppUser(): CrewAppUser | null {
  const { userId } = useGlobalSearchParams()
  const [{ db }] = useAppContext()

  const currentCrewAppUser = db.users?.find((u) => u.id === userId)

  if (!currentCrewAppUser) {
    return null
  }

  const nickname =
    db.characters?.find((cu) => cu.user_id === userId)?.nickname || undefined

  return { ...currentCrewAppUser, nickname }
}
