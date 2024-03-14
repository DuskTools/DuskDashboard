import UserService from './UserService'
import supabase from '~supabase'
import { AppState, User } from '~types'

async function onLogin({
  discord_id,
}: Pick<User['Row'], 'discord_id'>): Promise<
  Pick<AppState, 'campaignUsers' | 'campaigns' | 'clocks' | 'currentUser'>
> {
  const currentUser = await UserService.updateOrCreateOnLogin({ discord_id })

  const { data: campaigns } = await supabase.from('campaigns').select()
  const { data: clocks } = await supabase.from('clocks').select()
  const { data: campaignUsers } = await supabase.from('campaign_user').select()

  return Promise.resolve({
    campaignUsers,
    campaigns,
    clocks,
    currentUser,
  })
}

export default { onLogin }
