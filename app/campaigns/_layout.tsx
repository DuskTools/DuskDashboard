import { Redirect } from 'expo-router'
import Drawer from 'expo-router/drawer'

import useAppContext from '../../data/useAppContext'
import DrawerContent from '~components/navigation/DrawerContent'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import useLoading from '~hooks/useLoading'
import useAppTheme from '~theme/useAppTheme'

export default function DrawerNav() {
  const theme = useAppTheme()
  const { isLoading } = useLoading()
  const [state] = useAppContext()
  const currentCampaign = useCurrentCampaign()

  if (!isLoading && !state.currentUser) {
    return <Redirect href="/" />
  }

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
