import { Redirect } from 'expo-router'
import { Button } from 'react-native-paper'

import Container from '~components/Container'
import useAppContext from '~context/useAppContext'
import useAuth from '~hooks/useAuth'
import useLoading from '~hooks/useLoading'

export default function Home() {
  const { login } = useAuth()
  const [{ currentUser }] = useAppContext()
  const { isLoading } = useLoading()

  if (!isLoading && currentUser) {
    return <Redirect href="/campaigns/" />
  }

  return (
    <Container>
      <Button onPress={login}>Login with Discord</Button>
    </Container>
  )
}
