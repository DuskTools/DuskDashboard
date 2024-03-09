import supabase from '~supabase'
import { User, UserCampaign } from '~types'

async function campaignsForUser(user: User['Row']): Promise<UserCampaign[]> {
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
