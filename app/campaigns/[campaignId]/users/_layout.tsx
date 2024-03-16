import { Stack } from 'expo-router'

import useCurrentCampaignAppUser from '~hooks/useCurrentCampaignAppUser'

export default function UsersLayout() {
  const currentCampaignAppUser = useCurrentCampaignAppUser()

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[userId]"
        options={{
          title: currentCampaignAppUser?.nickname,
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  )
}
