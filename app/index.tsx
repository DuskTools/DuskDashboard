import { Button } from 'react-native-paper'

import Container from '~components/Container'
import useAuth from '~hooks/useAuth'

export default function Home() {
  const { login } = useAuth()

  return (
    <Container>
      <Button onPress={login}>Login with Discord</Button>
    </Container>
  )
}
