import { PropsWithChildren, useState } from 'react'

import { Link, LinkProps, router } from 'expo-router'
import { Pressable, View } from 'react-native'
import { Button, Divider, Menu } from 'react-native-paper'

import UserCell from '~components/UserCell'
import useAppContext from '~context/useAppContext'
import useLoading from '~hooks/useLoading'
import AuthService from '~services/supabase/AuthService'
import useAppTheme from '~theme/useAppTheme'
import { DynamicRoute } from '~types'

export default function HeaderRight() {
  const [{ currentUser }] = useAppContext()
  return (
    <View style={{ flexDirection: 'row', gap: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        {currentUser ? (
          <>
            <HeaderLink href="/crews/">Crews</HeaderLink>
          </>
        ) : (
          <>
            <HeaderLink href="/howToUse">How to use</HeaderLink>
          </>
        )}
      </View>
      <LoginCell />
    </View>
  )
}

const HeaderLink = ({
  children,
  ...props
}: PropsWithChildren<LinkProps<DynamicRoute>>) => {
  const theme = useAppTheme()
  return (
    <Link
      {...props}
      style={[
        { color: theme.colors.primary, textTransform: 'uppercase' },
        props.style,
      ]}
    >
      {children}
    </Link>
  )
}

const LoginCell = () => {
  const [{ currentUser, authLoaded }] = useAppContext()
  const { isLoading } = useLoading()
  const [visible, setVisible] = useState(false)
  if (!authLoaded && isLoading) {
    return null
  }
  return currentUser ? (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Pressable
          style={{ paddingRight: 20 }}
          onPress={() => setVisible(true)}
        >
          <UserCell size={20} user={currentUser} />
        </Pressable>
      }
    >
      <Menu.Item title="Home" onPress={() => router.push('/')} />
      <Divider />
      <Menu.Item title="Logout" onPress={AuthService.logout} />
    </Menu>
  ) : (
    <Button onPress={AuthService.login}>Login with Discord</Button>
  )
}
