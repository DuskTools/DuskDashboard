import { View } from 'react-native'

import AppText from '~components/AppText'
import Container from '~components/Container'
import useCurrentCrewAppUser from '~hooks/useCurrentCrewAppUser'

export default function User() {
  const currentCrewAppUser = useCurrentCrewAppUser()
  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <AppText>{currentCrewAppUser?.nickname}</AppText>
      </View>
    </Container>
  )
}
