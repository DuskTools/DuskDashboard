import { router } from 'expo-router'

import RoutesModel from '~models/RoutesModel'
import supabase from '~supabase'
import { Crew, User } from '~types'

const handleCreate = async (
  crewParams: Crew['Insert'],
  currentUser: User['Row']
) => {
  const { data: crew, error } = await supabase
    .from('crews')
    .insert(crewParams)
    .select()
    .single()

  if (error || !crew) {
    throw error
  }

  const { error: characterError } = await supabase.from('characters').insert({
    crew_id: crew.id,
    user_id: currentUser!.id,
    admin: true,
  })

  if (characterError) {
    throw new Error('There was an error creating your character.')
  }
  router.push(RoutesModel.crew(crew))
}
export default { handleCreate }
