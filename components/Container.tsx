import { PropsWithChildren } from 'react'

import { View, ViewStyle } from 'react-native'
import { ActivityIndicator, Portal } from 'react-native-paper'

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
        {
          flex: 1,
          paddingHorizontal: 30,
          backgroundColor: theme.colors.background,
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {showLoading && (
        <Portal>
          <ActivityIndicator
            style={{ height: '100%', backgroundColor: theme.colors.backdrop }}
          />
        </Portal>
      )}
      {children}
    </View>
  )
}
