import { PropsWithChildren, useEffect } from 'react'

import { router } from 'expo-router'
import { View, ViewStyle } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import { useAppContext } from '~context'
import useLoading from '~hooks/useLoading'
import useAppTheme from '~theme/useAppTheme'

type Props = PropsWithChildren<{
  style?: ViewStyle
  auth?: boolean
  loading?: boolean
}>

export default function Container({
  children,
  style,
  auth = false,
  loading = false,
}: Props) {
  const [{ currentUser }] = useAppContext()
  const { isLoading } = useLoading()
  const theme = useAppTheme()

  useEffect(() => {
    if (auth && !currentUser && !isLoading) {
      router.push('/')
    }
  }, [auth, currentUser, isLoading])
  const showLoading = isLoading || loading

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
      {showLoading && isLoading ? <ActivityIndicator /> : children}
    </View>
  )
}