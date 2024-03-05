import { useState } from 'react'

import { AuthError } from '@supabase/supabase-js'
import { View } from 'react-native'
import { PaperProvider, Button, Text } from 'react-native-paper'

import { supabaseAnon } from '../supabase'

export default function App() {
  const [data, setData] = useState<Record<string, string | null>>()
  const [error, setError] = useState<AuthError | null>()
  const handleClick = async () => {
    const { data, error } = await supabaseAnon.auth.signInWithOAuth({
      provider: 'discord',
    })
    setData(data)
    setError(error)
  }

  return (
    <PaperProvider>
      <View style={{ backgroundColor: 'grey' }}>
        <Button buttonColor="purple" onPress={handleClick}>
          Login with Discord
        </Button>
        <Text>{data ? JSON.stringify(data, null, 2) : error?.message}</Text>
      </View>
    </PaperProvider>
  )
}
