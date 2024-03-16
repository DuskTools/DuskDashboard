import { Redirect, Slot } from 'expo-router'

import useCurrentCrew from '~hooks/useCurrentCrew'
import useCurrentCrewAppUser from '~hooks/useCurrentCrewAppUser'
import useLoading from '~hooks/useLoading'
import { DynamicRoute } from '~types'

export default function UserLayout() {
  const currentCrew = useCurrentCrew()
  const currentCrewAppUser = useCurrentCrewAppUser()
  const { isLoading } = useLoading()

  if (!isLoading && !currentCrewAppUser) {
    return <Redirect href={`/crews/${currentCrew!.id}` as DynamicRoute} />
  }

  return <Slot />
}
