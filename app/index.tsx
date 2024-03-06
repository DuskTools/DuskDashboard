import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function App() {
  const [state] = useAppContext()
  const theme = useAppTheme()
  console.log(state)
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>{JSON.stringify(state.auth.session, null, 2)}</Text>
    </ScrollView>
  )
}
