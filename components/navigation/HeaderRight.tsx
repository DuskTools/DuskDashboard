import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import UserCell from '~components/UserCell'
import useAppContext from '~context/useAppContext'
import AuthService from '~services/supabase/AuthService'
import useAppTheme from '~theme/useAppTheme'

export default function HeaderRight() {
  const theme = useAppTheme()
  const [{ currentUser }] = useAppContext()

  const styles = StyleSheet.create({
    navLink: {
      color: theme.colors.primary,
      textTransform: 'uppercase',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

  return (
    <View style={{ flexDirection: 'row', gap: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        {currentUser ? (
          <>
            <Link style={styles.navLink} href="/">
              Home
            </Link>
            <Link style={styles.navLink} href="/crews/">
              Crews
            </Link>
          </>
        ) : (
          <>
            <Link style={styles.navLink} href="/howToUse">
              How to use
            </Link>
          </>
        )}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <LoginCell />
      </View>
    </View>
  )
}

const LoginCell = () => {
  const [{ currentUser, authLoaded }] = useAppContext()
  if (!authLoaded) {
    return null
  }
  return currentUser ? (
    <View style={{ paddingRight: 20 }}>
      <UserCell size={20} user={currentUser} />
    </View>
  ) : (
    <Button onPress={AuthService.login}>Login with Discord</Button>
  )
}
