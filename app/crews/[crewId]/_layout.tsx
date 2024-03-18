import { Redirect, Tabs, usePathname } from 'expo-router'
import { Icon } from 'react-native-paper'

import useCurrentCrew from '~hooks/useCurrentCrew'
import useLoading from '~hooks/useLoading'
import useAppTheme from '~theme/useAppTheme'

export default function CrewLayout() {
  const currentCrew = useCurrentCrew()
  const { isLoading } = useLoading()
  const theme = useAppTheme()
  const pathname = usePathname()
  const isInDeepUsersPath = pathname.match(/\/crews\/[^/]+\/characters\/[^/]+/)

  if (!isLoading && !currentCrew) {
    return <Redirect href="/" />
  }

  return (
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
          display: isInDeepUsersPath ? 'none' : 'flex',
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
          title: 'Clocks',
          tabBarLabel: 'Clocks',
          tabBarIcon: () => <Icon source="progress-clock" size={20} />,
        }}
      />
      <Tabs.Screen
        name="characters"
        options={{
          title: 'Characters',
          tabBarLabel: 'Characters',
          tabBarIcon: () => <Icon source="account-group-outline" size={20} />,
        }}
      />
    </Tabs>
  )
}
