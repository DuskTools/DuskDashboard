import { useEffect } from 'react'

import { useRootNavigationState, useRouter } from 'expo-router'
import Drawer from 'expo-router/drawer'

import DrawerContent from '~components/navigation/DrawerContent'
import DrawerHeader from '~components/navigation/DrawerHeader'
import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'
import DrawerNav from '~components/navigation/DrawerNav'

function useIsNavigationReady() {
  const rootNavigationState = useRootNavigationState()
  return rootNavigationState?.key != null
}

export default function DashboardLayout() {
  const isNavigationReady = useIsNavigationReady()
  const [state] = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (isNavigationReady && !state.currentUser) {
      router.push('/')
    }
  }, [isNavigationReady, state.currentUser])

  return <DrawerNav />
}
