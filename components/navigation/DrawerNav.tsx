import Drawer from 'expo-router/drawer'

import DrawerContent from './DrawerContent'
import Header from '~components/navigation/Header'
import useAppTheme from '~theme/useAppTheme'

export default function DrawerNav() {
  const theme = useAppTheme()
  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: { backgroundColor: theme.colors.surface },
        header: ({ navigation }) => {
          return <Header toggleDrawer={() => navigation.toggleDrawer()} />
        },
      }}
    />
  )
}
