import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { MD3DarkTheme } from 'react-native-paper'

export default function useAppTheme() {
  const { theme } = useMaterial3Theme()

  return { ...MD3DarkTheme, colors: theme.dark }
}
