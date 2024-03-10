import Drawer from 'expo-router/drawer'

import useAppContext from '../../data/useAppContext'
import DrawerContent from '~components/navigation/DrawerContent'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import useAppTheme from '~theme/useAppTheme'

export default function DrawerNav() {
  const theme = useAppTheme()
  const [state] = useAppContext()
  const currentCampaign = useCurrentCampaign()

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
      <Drawer.Screen name="index" options={{ title: 'Campaigns' }} />
      <Drawer.Screen
        name="[campaignId]"
        options={{ title: currentCampaign?.name }}
      />
    </Drawer>
  )
}
