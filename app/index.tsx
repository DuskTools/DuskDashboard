import Drawer from 'expo-router/drawer'
import { Button } from 'react-native-paper'

import Container from '~components/Container'
import useAuth from '~hooks/useAuth'

export default function Home() {
  const { login } = useAuth()

  return (
    <>
      <Drawer.Screen
        options={{
          title: 'Home',
        }}
      />
      <Container>
        <Button onPress={login}>Login with Discord</Button>
      </Container>
    </>
  )
}
