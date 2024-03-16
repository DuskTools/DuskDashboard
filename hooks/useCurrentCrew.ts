import { useGlobalSearchParams } from 'expo-router'

import useAppContext from '~context/useAppContext'
import UserCrewModel from '~models/UserCrewModel'
import { UserCrew } from '~types'

export default function useCurrentCrew(): UserCrew | null {
  const { crewId } = useGlobalSearchParams()
  const [{ db }] = useAppContext()

  const currentCrew = db.crews?.find((c) => c.id === crewId)

  if (!currentCrew) {
    return null
  }

  return UserCrewModel.toUserCrew(currentCrew, db)
}
