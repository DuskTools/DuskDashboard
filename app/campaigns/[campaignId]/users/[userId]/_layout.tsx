import { Redirect, Slot } from 'expo-router'

import useCurrentCampaign from '~hooks/useCurrentCampaign'
import useCurrentCampaignAppUser from '~hooks/useCurrentCampaignAppUser'
import useLoading from '~hooks/useLoading'
import { DynamicRoute } from '~types'

export default function UserLayout() {
  const currentCampaign = useCurrentCampaign()
  const currentCampaignAppUser = useCurrentCampaignAppUser()
  const { isLoading } = useLoading()

  if (!isLoading && !currentCampaignAppUser) {
    return (
      <Redirect href={`/campaigns/${currentCampaign!.id}` as DynamicRoute} />
    )
  }

  return <Slot />
}
