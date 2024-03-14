import { FlatList, View } from 'react-native'
import { ActivityIndicator, Divider } from 'react-native-paper'

import AppText from '~components/AppText'
import CampaignCell from '~components/CampaignCell'
import Container from '~components/Container'
import EmptyCampaignCell from '~components/EmptyCampaignCell'
import { useAppContext } from '~context'

export default function Campaigns() {
  const [{ campaigns }] = useAppContext()

  const adminCampaigns = campaigns?.filter((c) => c.admin) || []
  const playerCampaigns = campaigns?.filter((c) => !c.admin) || []

  return (
    <Container loading={campaigns === null}>
      {campaigns ? (
        <>
          <View style={{ flex: 1 }}>
            <AppText variant="headlineSmall">Games where you GM</AppText>
            <FlatList
              data={adminCampaigns}
              contentContainerStyle={{ gap: 20 }}
              renderItem={({ item }) => <CampaignCell campaign={item} />}
              ListEmptyComponent={EmptyCampaignCell}
            />
          </View>
          <Divider />
          <View style={{ flex: 1 }}>
            <AppText variant="headlineSmall">
              Games where you have a character
            </AppText>
            <FlatList
              data={playerCampaigns}
              contentContainerStyle={{ gap: 20 }}
              renderItem={({ item }) => <CampaignCell campaign={item} />}
              ListEmptyComponent={<AppText>No Campagins</AppText>}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  )
}
