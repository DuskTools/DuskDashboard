import { useEffect } from 'react'

import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import CampaignCell from '~components/CampaignCell'
import Container from '~components/Container'
import { useAppContext } from '~context'

export default function Dashboard() {
  const [state] = useAppContext()

  return (
    <Container auth>
      <FlatList
        style={{ flex: 1 }}
        data={state.campaigns}
        ListEmptyComponent={() => <Text>No Campaigns</Text>}
        renderItem={({ item: campaign }) => (
          <CampaignCell campaign={campaign} />
        )}
      />
    </Container>
  )
}
