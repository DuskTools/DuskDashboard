import { Redirect, Tabs } from 'expo-router'

import useCurrentCampaign from '~hooks/useCurrentCampaign'
import useLoading from '~hooks/useLoading'

export default function CampaignLayout() {
  const currentCampaign = useCurrentCampaign()
  const { isLoading } = useLoading()

  if (!isLoading && !currentCampaign) {
    return <Redirect href="/" />
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
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
          name="foo"
          options={{ title: 'Dashboard', tabBarLabel: 'Second One' }}
        />
      </Tabs>
    </>
  )
}
