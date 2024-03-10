import { Redirect, Tabs } from 'expo-router'

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
          tabBarStyle: {
            shadowColor: theme.colors.shadow,
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.shadow,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarLabel: 'Dashboard',
          }}
        />
        <Tabs.Screen
          name="clocks"
          options={{ title: 'Dashboard', tabBarLabel: 'Second One' }}
        />
      </Tabs>
    </>
  )
}
