import { Stack } from 'expo-router'

import useCurrentCrewAppUser from '~hooks/useCurrentCrewAppUser'

export default function UsersLayout() {
  const currentCrewAppUser = useCurrentCrewAppUser()

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[userId]"
        options={{
          title: currentCrewAppUser?.nickname,
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  )
}
