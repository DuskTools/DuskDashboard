import { PropsWithChildren } from 'react'

import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { router } from 'expo-router'
import { View } from 'react-native'
import { Button, Drawer } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import UserCell from '~components/UserCell'
import useAppContext from '~context/useAppContext'
import useAuth from '~hooks/useAuth'

const Section = ({ children }: PropsWithChildren) => (
  <Drawer.Section>
    <View style={{ padding: 15 }}>{children}</View>
  </Drawer.Section>
)

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { login, logout } = useAuth()
  const [state] = useAppContext()
  const { top } = useSafeAreaInsets()

  return (
    <View style={{ minWidth: 200, paddingTop: top }}>
      <Section>
        {state.currentUser ? (
          <>
            <UserCell user={state.currentUser} />
            <Button
              onPress={() => {
                props.navigation.closeDrawer()
                logout()
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button onPress={login}>Login with Discord</Button>
        )}
      </Section>
      <Section>
        <Button mode="text" onPress={() => router.push('/campaigns/')}>
          Campaigns
        </Button>
      </Section>
    </View>
  )
}
