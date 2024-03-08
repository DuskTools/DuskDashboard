import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function Dashboard() {
  const [state] = useAppContext()
  const theme = useAppTheme()
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>{JSON.stringify(state.currentUser, null, 2)}</Text>
    </ScrollView>
  )
}
