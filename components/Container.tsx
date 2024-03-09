import { PropsWithChildren } from 'react'

import { View, ViewStyle } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import useLoading from '~hooks/useLoading'
import useAppTheme from '~theme/useAppTheme'

type Props = PropsWithChildren<{ style?: ViewStyle }>

export default function Container({ children, style }: Props) {
  const { isLoading } = useLoading()
  const theme = useAppTheme()

  return (
    <View
      style={[
        style,
        {
          flex: 1,
          padding: 30,
          backgroundColor: theme.colors.shadow,
          justifyContent: 'center',
        },
      ]}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </View>
  )
}
