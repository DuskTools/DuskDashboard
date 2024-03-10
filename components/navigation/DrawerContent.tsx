import { PropsWithChildren } from 'react'

import { router } from 'expo-router'
import { Image, SafeAreaView, View } from 'react-native'
import { Button, Drawer, Text } from 'react-native-paper'

import { useAppContext } from '~context'
import useAuth from '~hooks/useAuth'

const Section = ({ children }: PropsWithChildren) => (
  <Drawer.Section>
    <View style={{ padding: 15 }}>{children}</View>
  </Drawer.Section>
)

export default function DrawerContent() {
  const { login, logout } = useAuth()
  const [state] = useAppContext()

  return (
    <SafeAreaView style={{ minWidth: 200 }}>
      <Section>
        {state.currentUser ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingBottom: 10,
              }}
            >
              <Image
                style={{ borderRadius: 50, height: 50, width: 50 }}
                source={{
                  uri: state.currentUser.avatar_url,
                }}
              />
              <Text style={{ textAlign: 'center' }}>
                {state.currentUser.email}
              </Text>
            </View>
            <Button onPress={logout}>Logout</Button>
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
    </SafeAreaView>
  )
}
