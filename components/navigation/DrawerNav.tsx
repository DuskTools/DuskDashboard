import Drawer from 'expo-router/drawer'

import DrawerContent from './DrawerContent'
import Header from '~components/navigation/DrawerHeader'
import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function DrawerNav() {
  const theme = useAppTheme()
  const [state] = useAppContext()

  const initialRouteName = state.currentUser ? 'campaigns' : 'index'
  return (
    <Drawer
      drawerContent={DrawerContent}
      initialRouteName={initialRouteName}
      screenOptions={{
        swipeEnabled: !!state.currentUser,
        drawerPosition: 'right',
        drawerStyle: { backgroundColor: theme.colors.surface },
        header: ({ navigation }) => {
          return <Header toggleDrawer={() => navigation.toggleDrawer()} />
        },
      }}
    >
      {state.currentUser ? (
        <>
          <Drawer.Screen name="campaigns" />
          <Drawer.Screen name="[campaignId]" />
        </>
      ) : (
        <Drawer.Screen name="index" />
      )}
    </Drawer>
  )
}
