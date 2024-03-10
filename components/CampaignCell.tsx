import { router } from 'expo-router'
import { Card } from 'react-native-paper'

import { UserCampaign } from '~types'

export default function CampaignCell({ campaign }: { campaign: UserCampaign }) {
  return (
    <Card onPress={() => router.push(`/campaigns/${campaign.id}/`)}>
      <Card.Title title={campaign.name} />
    </Card>
  )
}
