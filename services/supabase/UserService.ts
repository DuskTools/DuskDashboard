import supabase from '~supabase'
import { User } from '~types'

const updateOrCreateOnLogin = async (
  userParams: User['Insert']
): Promise<User['Row']> => {
  const existingUser = await find(userParams)
  if (existingUser) {
    return update(existingUser.id, userParams)
  }

  return create(userParams)
}

const create = async (createParams: User['Insert']): Promise<User['Row']> => {
  const { data, error } = await supabase
    .from('users')
    .insert(createParams)
    .select()
    .single()
  if (error) {
    throw error
  }

  return data!
}

const update = async (
  id: User['Row']['id'],
  updateParams: User['Update']
): Promise<User['Row']> => {
  const { data, error } = await supabase
    .from('users')
    .update(updateParams)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data!
}

const find = async ({
  discord_id,
}: Pick<User['Row'], 'discord_id'>): Promise<User['Row'] | null> => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('discord_id', discord_id)
    .maybeSingle()
  if (error) {
    throw error
  }

  return data
}

export default {
  find,
  updateOrCreateOnLogin,
}
