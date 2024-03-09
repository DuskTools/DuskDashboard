import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'

import useAuth from '~hooks/useAuth'
import useAppTheme from '~theme/useAppTheme'

export default function App() {
  const { login } = useAuth()
  const theme = useAppTheme()

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text variant="headlineLarge">Dusk Tools</Text>
      <Button mode="contained" onPress={login}>
        Login with Discord
      </Button>
    </ScrollView>
  )
}
