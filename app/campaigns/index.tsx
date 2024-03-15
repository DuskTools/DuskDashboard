import { FlatList, View } from 'react-native'
import { ActivityIndicator, Divider } from 'react-native-paper'

import AppText from '~components/AppText'
import CampaignCell from '~components/CampaignCell'
import Container from '~components/Container'
import EmptyCampaignCell from '~components/EmptyCampaignCell'
import useAppContext from '~context/useAppContext'
import UserCampaignModel from '~models/UserCampaignModel'

export default function Campaigns() {
  const [{ db }] = useAppContext()

  const currentCampaigns =
    db.campaigns?.map((campaign) =>
      UserCampaignModel.toUserCampaign(campaign, db)
    ) || []

  const adminCampaigns = currentCampaigns.filter((c) => c.admin) || []
  const playerCampaigns = currentCampaigns.filter((c) => !c.admin) || []

  return (
    <Container loading={db.campaigns === null}>
      {currentCampaigns.length > 0 ? (
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
