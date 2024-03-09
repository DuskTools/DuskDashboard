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
    console.log('Find or create user error')
    console.log(error)
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
    console.log('Update User Error')
    console.log(error)
  }

  return data!
}

const find = async ({
  auth_id,
}: Pick<User['Row'], 'auth_id'>): Promise<User['Row'] | null> => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('auth_id', auth_id)
    .maybeSingle()
  if (error) {
    console.log('Find User Error')
    console.log(error)
  }

  return data
}

export default {
  find,
  updateOrCreateOnLogin,
}
