import { SectionList } from 'react-native'

import AppText from '~components/AppText'
import CampaignCell from '~components/CampaignCell'
import Container from '~components/Container'
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

  const data = [
    { title: 'Games where I DM', data: adminCampaigns },
    { title: 'Games where I Play', data: playerCampaigns },
  ]

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
    </Container>
  )
}
