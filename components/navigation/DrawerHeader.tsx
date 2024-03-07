import { Link } from 'expo-router'
import { Pressable, View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type Props = {
  toggleDrawer: () => void
}

export default function DrawerHeader({ toggleDrawer }: Props) {
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
          <Text variant="headlineLarge">DuskTool</Text>
        </Link>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Pressable
            onPress={toggleDrawer}
            style={{ alignItems: 'baseline', flex: 1 }}
          >
            <Icon source="menu" size={40} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
