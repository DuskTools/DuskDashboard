import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'

import LayoutNav from '~components/navigation/LayoutNav'
import { AppProvider } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function Layout() {
  const theme = useAppTheme()

  return (
    <AppProvider>
      <StatusBar translucent style="auto" />
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LayoutNav />
        </GestureHandlerRootView>
      </PaperProvider>
    </AppProvider>
  )
}
