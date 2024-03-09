import { Image, View } from 'react-native'
import { Button, Drawer, Text } from 'react-native-paper'

import { useAppContext } from '~context'
import useAuth from '~hooks/useAuth'

export default function DrawerContent() {
  const { login, logout } = useAuth()
  const [state] = useAppContext()

  return (
    <View style={{ minWidth: 200 }}>
      <Drawer.Section>
        <View style={{ padding: 15 }}>
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
        </View>
      </Drawer.Section>
    </View>
  )
}
