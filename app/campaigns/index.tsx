import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

import CampaignCell from '~components/CampaignCell'
import Container from '~components/Container'
import { useAppContext } from '~context'

export default function Campaigns() {
  const [{ campaigns }] = useAppContext()
  console.log(campaigns)
  return (
    <Container loading={campaigns === null}>
      {campaigns && (
        <FlatList
          data={campaigns}
          renderItem={({ item }) => <CampaignCell campaign={item} />}
          ListEmptyComponent={() => <Text>No Campaigns</Text>}
        />
      )}
    </Container>
  )
}
