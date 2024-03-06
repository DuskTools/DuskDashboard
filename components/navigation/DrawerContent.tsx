import { useRouter } from 'expo-router'
import { View, Image } from 'react-native'
import { Drawer, Text, Button } from 'react-native-paper'

import { useAppContext } from '~context'
import AuthService from '~services/AuthService'

export default function DrawerContent() {
  const [state] = useAppContext()
  const router = useRouter()

  return (
    <View>
      <Drawer.Section>
        <View style={{ padding: 15 }}>
          {state.auth.session ? (
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
                    uri: state.auth.session?.user.user_metadata?.avatar_url,
                  }}
                />
                <Text style={{ textAlign: 'center' }}>
                  {state.auth.session.user.email}
                </Text>
              </View>
              <Button onPress={AuthService.logout}>Logout</Button>
            </>
          ) : (
            <Button onPress={AuthService.login}>Login with Discord</Button>
          )}
        </View>
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item label="Home" onPress={() => router.push('/')} />
      </Drawer.Section>
    </View>
  )
}
