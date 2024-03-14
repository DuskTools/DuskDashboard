import { useGlobalSearchParams } from 'expo-router'

import { useAppContext } from '~context'
import UserCampaignModel from '~models/UserCampaignModel'
import { UserCampaign } from '~types'

export default function useCurrentCampaign(): UserCampaign | null {
  const { campaignId } = useGlobalSearchParams()
  const [state] = useAppContext()

  const currentCampaign = state.campaigns?.find((c) => c.id === campaignId)

  if (!currentCampaign) {
    return null
  }

  return UserCampaignModel.toUserCampaign(currentCampaign, state)
}
