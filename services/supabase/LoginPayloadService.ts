import UserService from './UserService'
import supabase from '~supabase'
import { AppState, User } from '~types'

async function onLogin({
  discord_id,
}: Pick<User['Row'], 'discord_id'>): Promise<
  Pick<AppState, 'db' | 'currentUser'>
> {
  const currentUser = await UserService.updateOrCreateOnLogin({ discord_id })

  const { data: crews } = await supabase.from('crews').select()
  const { data: clocks } = await supabase.from('clocks').select()
  const { data: characters } = await supabase.from('campaign_user').select()
  const { data: users } = await supabase
    .from('users')
    .select('id, discord_id, avatar_url, created_at, discord_global_name')

  return Promise.resolve({
    db: {
      characters,
      crews,
      clocks,
      users,
    },
    currentUser,
  })
}

export default { onLogin }
