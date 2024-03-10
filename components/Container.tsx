import { PropsWithChildren } from 'react'

import { View, ViewStyle } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import useLoading from '~hooks/useLoading'
import useAppTheme from '~theme/useAppTheme'

type Props = PropsWithChildren<{
  style?: ViewStyle
  auth?: boolean
  loading?: boolean
}>

export default function Container({ children, style, loading = false }: Props) {
  const { isLoading } = useLoading()
  const theme = useAppTheme()

  const showLoading = isLoading || loading

  return (
    <View
      style={[
        style,
        {
          flex: 1,
          padding: 30,
          backgroundColor: theme.colors.background,
          justifyContent: 'center',
        },
      ]}
    >
      {showLoading && isLoading ? <ActivityIndicator /> : children}
    </View>
  )
}
