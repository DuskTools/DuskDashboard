import { Stack } from 'expo-router'

import useCurrentCharacter from '~hooks/useCurrentCharacter'

export default function UsersLayout() {
  const currentCharacter = useCurrentCharacter()

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[userId]"
        options={{
          title: currentCharacter?.nickname || 'User',
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  )
}
