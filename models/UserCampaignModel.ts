import { Campaign, DbState, UserCampaign, CampaignAppUser } from '~types'

const toUserCampaign = (
  campaign: Campaign['Row'],
  state: Pick<DbState, 'clocks' | 'campaignUsers' | 'users'>
): UserCampaign => {
  const matchingCampaignId = ({ campaign_id }: { campaign_id: string }) =>
    campaign_id === campaign.id

  const campaignUsers =
    state.campaignUsers
      ?.filter(matchingCampaignId)
      .map(({ user_id, admin, nickname }) => ({
        user: { ...state.users?.find(({ id }) => id === user_id), nickname },

        admin,
      })) || []

  const clocks = state.clocks?.filter(matchingCampaignId) || []
  const admin = state.campaignUsers?.find(matchingCampaignId)?.admin || false
  const gms =
    (campaignUsers
      .filter(({ admin }) => admin)
      .map(({ user }) => user) as CampaignAppUser[]) || []
  const players =
    (campaignUsers
      .filter(({ admin }) => !admin)
      .map(({ user }) => user) as CampaignAppUser[]) || []

  return { ...campaign, clocks, admin, gms, players }
}

export default { toUserCampaign }
