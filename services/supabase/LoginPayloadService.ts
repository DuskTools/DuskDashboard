import UserService from './UserService'
import Logger from '~services/Logger'
import supabase from '~supabase'
import { AppState, User } from '~types'

async function onLogin(
  userParams: Pick<User['Row'], 'auth_id'>
): Promise<Pick<AppState, 'db' | 'currentUser'>> {
  const currentUser = await UserService.updateOrCreateOnLogin(userParams)

  const { data: characters } = await supabase
    .from('characters')
    .select()
    .eq('user_id', currentUser.id)
  const { data: crews } = await supabase
    .from('crews')
    .select()
    .in('id', characters?.map((c) => c.crew_id) || [])
  const { data: clocks } = await supabase
    .from('clocks')
    .select()
    .in('crew_id', crews?.map((c) => c.id) || [])
  const { data: users } = await supabase
    .from('users')
    .select('id, discord_id, avatar_url, created_at, display_name')
    .in('id', characters?.map((c) => c.user_id) || [])

  const db = {
    characters: characters || [],
    crews: crews || [],
    clocks: clocks || [],
    users: users || [],
  }
  Logger.log('onLogin', db)

  return Promise.resolve({
    db,
    currentUser,
  })
}

export default { onLogin }
