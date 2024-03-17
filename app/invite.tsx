import { useEffect } from 'react'

import { router, useGlobalSearchParams } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

import Container from '~components/Container'
import useAppContext from '~context/useAppContext'
import useAuth from '~hooks/useAuth'
import useLoading from '~hooks/useLoading'
import RoutesModel from '~models/RoutesModel'
import supabase from '~supabase'

export default function Invite() {
  const { crewId } = useGlobalSearchParams()
  const [{ currentUser }] = useAppContext()
  const { isLoading } = useLoading()
  const { login } = useAuth()

  useEffect(() => {
    const init = async () => {
      if (!isLoading) {
        if (!crewId) {
          router.replace('/')
          return
        }

        const { data: crew, error: crewError } = await supabase
          .from('crews')
          .select()
          .eq('id', crewId as string)
          .maybeSingle()

        if (crewError || !crew) {
          router.replace('/')
          return
        }

        if (currentUser) {
          const { data: character, error } = await supabase
            .from('characters')
            .select()
            .eq('user_id', currentUser.id)
            .eq('crew_id', crewId as string)
            .maybeSingle()

          if (error) {
            throw error
          }

          if (character) {
            router.replace(
              RoutesModel.crewCharacter({ id: crewId as string }, character)
            )
            return
          }

          const { data: newCharacter, error: newCharacterError } =
            await supabase
              .from('characters')
              .insert({
                user_id: currentUser.id,
                crew_id: crewId as string,
                admin: false,
              })
              .single()

          if (newCharacterError) {
            throw newCharacterError
          }

          router.replace(
            RoutesModel.crewCharacter({ id: crewId as string }, newCharacter)
          )
          return
        }
        if (!currentUser) {
          await login()
        }
      }
    }
    init()
  }, [isLoading, currentUser, crewId])

  return (
    <Container>
      <ActivityIndicator />
    </Container>
  )
}
