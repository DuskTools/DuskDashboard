import { ComponentProps, PropsWithChildren } from 'react'

import { Stack } from 'expo-router'

import HeaderRight from './HeaderRight'
import useAppTheme from '~theme/useAppTheme'

export default function CommonStack({
  children,
  ...restProps
}: PropsWithChildren<ComponentProps<typeof Stack>>) {
  const theme = useAppTheme()

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.primary,
    headerRight: HeaderRight,
  }
  return (
    <Stack
      {...restProps}
      screenOptions={{ ...screenOptions, ...restProps.screenOptions }}
    >
      {children}
    </Stack>
  )
}
