import { View } from 'react-native'

import AppText from '~components/AppText'
import Container from '~components/Container'
import useCurrentCharacter from '~hooks/useCurrentCharacter'

export default function User() {
  const currentCharacter = useCurrentCharacter()
  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <AppText>{currentCharacter?.nickname}</AppText>
      </View>
    </Container>
  )
}
