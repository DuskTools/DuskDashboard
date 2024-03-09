import { PropsWithChildren } from 'react'

import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import useLoading from '~hooks/useLoading'
import useAppTheme from '~theme/useAppTheme'

type Props = PropsWithChildren

export default function Container({ children }: Props) {
  const { isLoading } = useLoading()
  const theme = useAppTheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.shadow,
        justifyContent: 'center',
      }}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </View>
  )
}
