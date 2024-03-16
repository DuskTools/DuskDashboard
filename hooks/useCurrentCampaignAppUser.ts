import { useGlobalSearchParams } from 'expo-router'

import useAppContext from '~context/useAppContext'
import { CampaignAppUser } from '~types'

export default function useCurrentCampaignAppUser(): CampaignAppUser | null {
  const { userId } = useGlobalSearchParams()
  const [{ db }] = useAppContext()

  const currentCampaignAppUser = db.users?.find((u) => u.id === userId)

  if (!currentCampaignAppUser) {
    return null
  }

  const nickname =
    db.campaignUsers?.find((cu) => cu.user_id === userId)?.nickname || undefined

  return { ...currentCampaignAppUser, nickname }
}
