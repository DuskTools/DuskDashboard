import { PropsWithChildren } from 'react'

import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'

import AppProvider from '~context/AppProvider'
import useAppTheme from '~theme/useAppTheme'

export default function AppWrapper({ children }: PropsWithChildren) {
  const theme = useAppTheme()

  return (
    <AppProvider>
      <StatusBar style="dark" />
      <PaperProvider theme={theme}>
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
          {children}
        </GestureHandlerRootView>
      </PaperProvider>
    </AppProvider>
  )
}
