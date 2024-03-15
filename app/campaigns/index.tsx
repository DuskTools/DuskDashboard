import { Linking, SectionList } from 'react-native'

import AppFAB from '~components/AppFAB'
import AppText from '~components/AppText'
import CampaignCell from '~components/CampaignCell'
import Container from '~components/Container'
import useAppContext from '~context/useAppContext'
import UserCampaignModel from '~models/UserCampaignModel'

const LINK =
  'https://discord.com/oauth2/authorize?client_id=1026293303584497704&permissions=0&scope=bot+applications.commands'

export default function Campaigns() {
  const [{ db }] = useAppContext()

  const currentCampaigns =
    db.campaigns?.map((campaign) =>
      UserCampaignModel.toUserCampaign(campaign, db)
    ) || []

  const adminCampaigns = currentCampaigns.filter((c) => c.admin) || []
  const playerCampaigns = currentCampaigns.filter((c) => !c.admin) || []

  const data = [
    { title: 'Games where I DM', data: adminCampaigns },
    { title: 'Games where I Play', data: playerCampaigns },
  ]
  const openUrl = async () => {
    await Linking.openURL(LINK)
  }

  return (
    <Container loading={db.campaigns === null}>
      <SectionList
        sections={data}
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <CampaignCell campaign={item} />} // Fix: Pass item as campaign prop
        renderSectionHeader={({ section: { title } }) => (
          <AppText>{title}</AppText>
        )}
      />
      <AppFAB icon="plus" onPress={openUrl} />
    </Container>
  )
}
