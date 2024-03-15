import { ComponentProps } from 'react'

import { View, ViewStyle } from 'react-native'
import { FAB } from 'react-native-paper'

type Props = ComponentProps<typeof FAB> & {
  contentContainerStyle?: ViewStyle
}
export default function AppFAB({
  contentContainerStyle = {},
  ...props
}: Props) {
  return (
    <View
      style={[
        {
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        },
        contentContainerStyle,
      ]}
    >
      <FAB {...props} style={[props.style]} />
    </View>
  )
}
