import { Platform } from 'react-native'
import { Text, TextProps } from 'react-native-paper'

export default function AppText(props: TextProps<unknown>) {
  return <Text selectable={Platform.OS === 'web'} {...props} />
}
