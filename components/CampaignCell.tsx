import { router } from 'expo-router'
import { Card } from 'react-native-paper'

import { PlayerList } from './PlayerList'
import { UserCampaign } from '~types'

export default function CampaignCell({ campaign }: { campaign: UserCampaign }) {
  return (
    <Card onPress={() => router.push(`/campaigns/${campaign.id}/`)}>
      <Card.Title title={campaign.name} />
      <Card.Content>
        <PlayerList playerList={campaign.gms} label="Game Master" />
        <PlayerList playerList={campaign.players} label="Player" />
      </Card.Content>
    </Card>
  )
}
