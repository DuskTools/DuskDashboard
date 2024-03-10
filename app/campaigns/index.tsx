import { FlatList } from 'react-native'

import CampaignCell from '~components/CampaignCell'
import Container from '~components/Container'
import EmptyCampaignCell from '~components/EmptyCampaignCell'
import { useAppContext } from '~context'

export default function Campaigns() {
  const [{ campaigns }] = useAppContext()

  return (
    <Container loading={campaigns === null}>
      {campaigns && (
        <FlatList
          data={[...campaigns, 'new']}
          contentContainerStyle={{ gap: 20 }}
          renderItem={({ item }) =>
            typeof item === 'string' ? (
              <EmptyCampaignCell />
            ) : (
              <CampaignCell campaign={item} />
            )
          }
          ListEmptyComponent={EmptyCampaignCell}
        />
      )}
    </Container>
  )
}
