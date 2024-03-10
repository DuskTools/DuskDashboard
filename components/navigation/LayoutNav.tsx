import Drawer from 'expo-router/drawer'

import DrawerContent from './DrawerContent'
import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function LayoutNav() {
  const theme = useAppTheme()
  const [state] = useAppContext()

  const initialRouteName = state.currentUser ? 'campaigns' : 'index'
  return (
    <Drawer
      drawerContent={DrawerContent}
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: !!state.currentUser,
        swipeEnabled: !!state.currentUser,
        drawerStyle: { backgroundColor: theme.colors.surface },
        headerTitleStyle: { color: theme.colors.primary },
        headerTintColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="campaigns/index" />
      <Drawer.Screen name="campaigns/[campaignId]" />
    </Drawer>
  )
}
