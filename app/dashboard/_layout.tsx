import { useEffect } from 'react'

import { useRootNavigationState, useRouter } from 'expo-router'
import Drawer from 'expo-router/drawer'

import DrawerContent from '~components/navigation/DrawerContent'
import DrawerHeader from '~components/navigation/DrawerHeader'
import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'

function useIsNavigationReady() {
  const rootNavigationState = useRootNavigationState()
  return rootNavigationState?.key != null
}

export default function DashboardLayout() {
  const isNavigationReady = useIsNavigationReady()
  const [state] = useAppContext()
  const router = useRouter()
  const theme = useAppTheme()

  useEffect(() => {
    if (isNavigationReady && !state.auth.session) {
      router.push('/')
    }
  }, [isNavigationReady, state.auth.session])

  return (
    <Drawer
      drawerContent={DrawerContent}
      initialRouteName="index"
      screenOptions={{
        swipeEnabled: !!state.auth.session,
        drawerPosition: 'right',
        drawerStyle: { backgroundColor: theme.colors.surface },
        header: ({ navigation }) => {
          return <DrawerHeader toggleDrawer={() => navigation.toggleDrawer()} />
        },
      }}
    />
  )
}
