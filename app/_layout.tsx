import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import LayoutNav from '~components/navigation/LayoutNav'
import { AppProvider } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function Layout() {
  const theme = useAppTheme()

  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <LayoutNav />
          </SafeAreaView>
        </GestureHandlerRootView>
      </PaperProvider>
    </AppProvider>
  )
}
