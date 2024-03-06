import Drawer from 'expo-router/drawer'

import DrawerContent from './DrawerContent'
import Header from '~components/navigation/Header'
import { useAppContext } from '~context'
import useAppTheme from '~theme/useAppTheme'

export default function DrawerNav() {
  const theme = useAppTheme()
  const [state] = useAppContext()

  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        swipeEnabled: !!state.auth.session,
        drawerPosition: 'right',
        drawerStyle: { backgroundColor: theme.colors.surface },
        header: ({ navigation }) => {
          return <Header toggleDrawer={() => navigation.toggleDrawer()} />
        },
      }}
    />
  )
}
