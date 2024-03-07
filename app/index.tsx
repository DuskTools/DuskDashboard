import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'

import AuthService from '~services/AuthService'
import useAppTheme from '~theme/useAppTheme'

export default function App() {
  const theme = useAppTheme()
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text variant="headlineLarge">Dusk Tools</Text>
      <Button mode="contained" onPress={AuthService.login}>
        Login with Discord
      </Button>
    </ScrollView>
  )
}
