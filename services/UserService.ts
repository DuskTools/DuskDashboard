import supabase from '~supabase'
import { User } from '~types'

const findOrCreate = async (
  userParams: User['Insert']
): Promise<User['Row']> => {
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

export default {
  findOrCreate,
}
