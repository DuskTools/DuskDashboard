import { ScrollView } from 'react-native-gesture-handler'

import { useAppState } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function App() {
  const [state] = useAppState()
  const theme = useAppTheme()
  console.log(state)
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} />
  )
}
