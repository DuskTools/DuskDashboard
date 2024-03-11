import { Redirect, Tabs } from 'expo-router'
import { Icon } from 'react-native-paper'

import useCurrentCampaign from '~hooks/useCurrentCampaign'
import useLoading from '~hooks/useLoading'
import useAppTheme from '~theme/useAppTheme'

export default function CampaignLayout() {
  const currentCampaign = useCurrentCampaign()
  const { isLoading } = useLoading()
  const theme = useAppTheme()

  if (!isLoading && !currentCampaign) {
    return <Redirect href="/" />
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelPosition: 'below-icon',
          tabBarActiveBackgroundColor: theme.colors.background,
          tabBarInactiveBackgroundColor: theme.colors.shadow,
          tabBarStyle: {
            shadowColor: theme.colors.shadow,
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.shadow,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarLabel: 'Dashboard',
            tabBarIcon: () => <Icon source="knife-military" size={20} />,
          }}
        />
        <Tabs.Screen
          name="clocks"
          options={{
            title: 'Dashboard',
            tabBarLabel: 'Clocks',
            tabBarIcon: () => <Icon source="progress-clock" size={20} />,
          }}
        />
      </Tabs>
    </>
  )
}
