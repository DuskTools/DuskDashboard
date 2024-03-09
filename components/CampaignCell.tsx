import { Link } from 'expo-router'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { UserCampaign } from '~types'

export default function CampaignCell({ campaign }: { campaign: UserCampaign }) {
  return (
    <View>
      <Link href={`/campaigns/${campaign.id}`}>
        <Text>{campaign.name}</Text>
      </Link>
    </View>
  )
}
