import { Redirect, Slot } from 'expo-router'

import useCurrentCharacter from '~hooks/useCurrentCharacter'
import useCurrentCrew from '~hooks/useCurrentCrew'
import useLoading from '~hooks/useLoading'
import { DynamicRoute } from '~types'

export default function UserLayout() {
  const currentCrew = useCurrentCrew()
  const currentCharacter = useCurrentCharacter()
  const { isLoading } = useLoading()

  if (!isLoading && !currentCharacter) {
    return <Redirect href={`/crews/${currentCrew!.id}` as DynamicRoute} />
  }

  return <Slot />
}
