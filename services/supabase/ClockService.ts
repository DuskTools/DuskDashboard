import supabase from '~supabase'
import { Clock } from '~types'

const create = async (createParams: Clock['Insert']) => {
  const { data, error } = await supabase
    .from('clocks')
    .insert(createParams)
    .select()
    .single()
  if (error) throw error
  return data
}

const update = async (
  id: Clock['Row']['id'],
  updateParams: Clock['Update']
): Promise<Clock['Row']> => {
  const { data, error } = await supabase
    .from('clocks')
    .update(updateParams)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data!
}



export default { create, update }
