import { AppState, Campaign, UserCampaign } from '~types'

const toUserCampaign = (
  campaign: Campaign['Row'],
  state: Pick<AppState, 'clocks' | 'campaignUsers'>
): UserCampaign => {
  const matchingCampaignId = ({ campaign_id }: { campaign_id: string }) =>
    campaign_id === campaign.id

  const clocks = state.clocks?.filter(matchingCampaignId) || []
  const admin = state.campaignUsers?.find(matchingCampaignId)?.admin || false

  return { ...campaign, clocks, admin }
}

export default { toUserCampaign }
