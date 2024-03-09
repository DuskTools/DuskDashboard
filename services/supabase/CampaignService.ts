import supabase from '~supabase'
import { Campaign, User, UserCampaign } from '~types'

async function campaignsForUser(user: User['Row']): Promise<UserCampaign[]> {
  // const { data, error } = await supabase
  //   .from('campaign_user')
  //   .select()
  //   .eq('user_id', user.id)

  // if (error) {
  //   console.log(error)
  //   throw error
  // }

  // const campaignIds = data?.map((cu) => cu.campaign_id) || []

  // if (campaignIds.length === 0) {
  //   return []
  // }

  // const { data: campaigns, error: campaignError } = await supabase
  //   .from('campaigns')
  //   .select()
  //   .in('id', campaignIds)

  // if (campaignError) {
  //   console.log(campaignError)
  //   throw campaignError
  // }

  const { data, error } = await supabase
    .from('campaign_user')
    .select(
      `
    *,
    campaign:campaigns(*)
  `
    )
    .eq('user_id', user.id)

  if (error) {
    console.log(error)
    throw error
  }

  return (
    (data
      .map(({ campaign, admin }) => {
        if (!campaign) return false
        return {
          ...campaign,
          admin: admin || false,
        } as UserCampaign
      })
      .filter((item) => item) as UserCampaign[]) || []
  )
}

export default { campaignsForUser }
