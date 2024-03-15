import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'

import AppProvider from '~context/AppProvider'
import useAppTheme from '~theme/useAppTheme'

export default function RootLayout() {
  const theme = useAppTheme()

  return (
    <AppProvider>
      <StatusBar style="dark" />
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </PaperProvider>
    </AppProvider>
  )
}
