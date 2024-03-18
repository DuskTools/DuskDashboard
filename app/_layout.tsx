import { Stack } from 'expo-router'

import AppWrapper from '~components/navigation/AppWrapper'
import CommonStack from '~components/navigation/CommonStack'

export default function RootLayout() {
  return (
    <AppWrapper>
      <CommonStack>
        <Stack.Screen name="crews" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: 'DuskTools' }} />
        <Stack.Screen
          name="howToUse"
          options={{ title: 'How To use DuskTools' }}
        />
      </CommonStack>
    </AppWrapper>
  )
}
