import { Link } from 'expo-router'
import { Pressable, View } from 'react-native'
import { Button, Icon, Text, useTheme } from 'react-native-paper'

import { useAppContext } from '~context'
import useAuth from '~hooks/useAuth'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import useLoading from '~hooks/useLoading'

type Props = {
  toggleDrawer: () => void
}

export default function DrawerHeader({ toggleDrawer }: Props) {
  const [{ currentUser }] = useAppContext()
  const currentCampaign = useCurrentCampaign()

  const { login } = useAuth()
  const { isLoading } = useLoading()
  const theme = useTheme()

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
          <Text variant="headlineLarge">
            DuskTool {currentCampaign ? `- ${currentCampaign.name}` : ''}{' '}
          </Text>
        </Link>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          {isLoading ? null : currentUser ? (
            <Pressable
              onPress={toggleDrawer}
              style={{ alignItems: 'baseline', flex: 1 }}
            >
              <Icon source="menu" size={40} />
            </Pressable>
          ) : (
            <Button onPress={login}>Login</Button>
          )}
        </View>
      </View>
    </View>
  )
}
