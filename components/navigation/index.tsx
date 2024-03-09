import { useRootNavigationState } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'

import useAuth from '~hooks/useAuth'
import useAppTheme from '~theme/useAppTheme'

export default function App() {
  const { login } = useAuth()
  const theme = useAppTheme()
  const navigationState = useRootNavigationState()
  console.log(navigationState)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text variant="headlineLarge">Dusk Tools</Text>
      <Button mode="contained" onPress={login}>
        Login with Discord
      </Button>
    </ScrollView>
  )
}
