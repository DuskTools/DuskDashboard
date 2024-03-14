import UserService from './UserService'
import supabase from '~supabase'
import { AppState, Clock, User } from '~types'

async function onLogin({
  discord_id,
}: Pick<User['Row'], 'discord_id'>): Promise<
  Pick<AppState, 'campaignUsers' | 'campaigns' | 'clocks' | 'currentUser'>
> {
  const currentUser = await UserService.updateOrCreateOnLogin({ discord_id })

  const { data: campaigns } = await supabase.from('campaigns').select()
  const clocks: Clock['Row'][] = []
  const { data: campaignUsers } = await supabase.from('campaign_user').select()
  console.log('HEREHERE')
  console.log(campaignUsers)
  console.log('HEREHERE')

  return Promise.resolve({
    campaignUsers,
    campaigns,
    clocks,
    currentUser,
  })
}

export default { onLogin }
