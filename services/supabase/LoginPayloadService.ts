import UserService from './UserService'
import Logger from '~services/Logger'
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
  const { data: characters } = await supabase.from('characters').select()
  const { data: users } = await supabase
    .from('users')
    .select('id, discord_id, avatar_url, created_at, discord_global_name')

  const db = {
    characters,
    crews,
    clocks,
    users,
  }
  Logger.log('onLogin', db)

  return Promise.resolve({
    db,
    currentUser,
  })
}

export default { onLogin }
