import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { useAppState } from '~context'
import AuthService from '~services/AuthService'

export default function Header() {
  const [
    {
      auth: { session },
    },
  ] = useAppState()

  const authComponent = session ? (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <Text style={{ paddingRight: 5 }}>
        Signed in as {session.user?.email}
      </Text>

      <Button compact mode="contained" onPress={AuthService.logout}>
        Logout
      </Button>
    </View>
  ) : (
    <Button compact mode="contained" onPress={AuthService.login}>
      Login with Discord
    </Button>
  )

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: 'red',
        minHeight: 50,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="headlineLarge">DuskTools</Text>
        {authComponent}
      </View>
    </View>
  )
}
