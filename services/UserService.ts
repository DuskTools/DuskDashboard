import supabase from '~supabase'
import { User } from '~types'

const findOrCreate = async (
  userParams: User['Insert']
): Promise<User['Row']> => {
  const existingUser = await find(userParams)
  if (existingUser) {
    return existingUser
  }

  const { data, error } = await supabase
    .from('users')
    .insert(userParams)
    .select()
    .single()
  if (error) {
    console.log('Find or create user error')
    console.log(error)
  }

  return data!
}

const find = async ({ auth_id }: Pick<User['Row'], 'auth_id'>): Promise<User['Row'] | null> => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('auth_id', auth_id)
    .limit(1)
    .single()
  if (error) {
    console.log('Find or create user error')
    console.log(error)
  }

  return data
}

export default {
  find,
  findOrCreate,
}
