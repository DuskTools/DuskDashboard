import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native-paper'

import useAppContext from '../../data/useAppContext'
import Container from '~components/Container'

export default function Campaign() {
  const { campaignId } = useLocalSearchParams()
  const [{ campaigns }] = useAppContext()
  const campaign = campaigns.find((c) => c.id === campaignId)

  return (
    <Container auth>
      <Text>
        {campaign ? campaign.name : `No Campaign found for ${campaignId}`}
      </Text>
    </Container>
  )
}
