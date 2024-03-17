import { useGlobalSearchParams } from 'expo-router'

import useAppContext from '~context/useAppContext'
import { Character } from '~types'

export default function useCurrentCharacter(): Character['Row'] | null {
  const { characterId } = useGlobalSearchParams()
  const [{ db }] = useAppContext()

  const currentCharacter = db.characters?.find(
    (u) => u.id === Number(characterId)
  )

  if (!currentCharacter) {
    return null
  }

  return currentCharacter
}
