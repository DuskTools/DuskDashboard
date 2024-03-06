import { Link } from 'expo-router'
import { Pressable, View } from 'react-native'
import { Button, Icon, Text, useTheme } from 'react-native-paper'

import { useAppContext } from '~context'
import AuthService from '~services/AuthService'

type Props = {
  toggleDrawer: () => void
}

export default function Header({ toggleDrawer }: Props) {
  const theme = useTheme()
  const [
    {
      auth: { session },
    },
  ] = useAppContext()

  return (
    <View
      style={{
        padding: 10,
        minHeight: 50,
        backgroundColor: theme.colors.surface,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/">
          <Text variant="headlineLarge">DuskTool</Text>
        </Link>
        {session ? (
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Pressable
              onPress={toggleDrawer}
              style={{ alignItems: 'baseline', flex: 1 }}
            >
              <Icon source="menu" size={40} />
            </Pressable>
          </View>
        ) : (
          <Button compact mode="contained" onPress={AuthService.login}>
            Login with Discord
          </Button>
        )}
      </View>
    </View>
  )
}
