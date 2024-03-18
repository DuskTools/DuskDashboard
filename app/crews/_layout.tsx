import { Redirect, Stack } from 'expo-router'

import useAppContext from '../../data/useAppContext'
import CommonStack from '~components/navigation/CommonStack'
import useCurrentCrew from '~hooks/useCurrentCrew'
import useLoading from '~hooks/useLoading'

export default function DrawerNav() {
  const { isLoading } = useLoading()
  const [state] = useAppContext()
  const currentCrew = useCurrentCrew()

  if (!isLoading && !state.currentUser) {
    return <Redirect href="/" />
  }

  const initialRouteName = state.currentUser ? 'crews' : 'index'
  return (
    <CommonStack initialRouteName={initialRouteName}>
      <Stack.Screen name="index" options={{ title: 'Crews' }} />
      <Stack.Screen name="new" options={{ title: 'Make a new Crew' }} />
      <Stack.Screen name="[crewId]" options={{ title: currentCrew?.name }} />
    </CommonStack>
  )
}
