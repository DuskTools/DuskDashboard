import { View } from 'react-native'

import AppText from '~components/AppText'
import Container from '~components/Container'
import useCurrentCampaignAppUser from '~hooks/useCurrentCampaignAppUser'

export default function User() {
  const currentCampaignAppUser = useCurrentCampaignAppUser()
  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <AppText>{currentCampaignAppUser?.nickname}</AppText>
      </View>
    </Container>
  )
}
