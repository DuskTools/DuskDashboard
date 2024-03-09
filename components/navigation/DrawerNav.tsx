import { useEffect } from 'react'

import { router, useRootNavigationState } from 'expo-router'
import Drawer from 'expo-router/drawer'

import DrawerContent from './DrawerContent'
import Header from '~components/navigation/DrawerHeader'
import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function DrawerNav() {
  const theme = useAppTheme()
  const [state] = useAppContext()
  const navigationState = useRootNavigationState()

  useEffect(() => {
    if (!navigationState?.key) return

    if (!state.currentUser) {
      router.push('/')
    }
  }, [navigationState, state.currentUser])

  return (
    <Drawer
      drawerContent={DrawerContent}
      initialRouteName="index"
      screenOptions={{
        swipeEnabled: !!state.currentUser,
        drawerPosition: 'right',
        drawerStyle: { backgroundColor: theme.colors.surface },
        header: ({ navigation }) => {
          return <Header toggleDrawer={() => navigation.toggleDrawer()} />
        },
      }}
    />
  )
}
