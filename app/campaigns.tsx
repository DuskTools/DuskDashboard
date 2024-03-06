import { useEffect } from 'react'

import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-paper'

import { useAppContext } from '~context'

export default function Campaigns() {
  const [state] = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (!state.auth.session) {
      router.push('/')
    }
  }, [state.auth.session])

  return (
    <ScrollView>
      <Text>Campaigns</Text>
    </ScrollView>
  )
}
