import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import useAppTheme from '../theme/useAppTheme'
import Header from '~components/Header'
import { AppProvider } from '~context'

export default function Layout() {
  const paperTheme = useAppTheme()
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <PaperProvider theme={paperTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
          <View style={{ flex: 1, flexGrow: 1 }}>
            <Slot />
          </View>
        </SafeAreaView>
      </PaperProvider>
    </AppProvider>
  )
}
