import { Linking, SectionList } from 'react-native'

import AppFAB from '~components/AppFAB'
import AppText from '~components/AppText'
import Container from '~components/Container'
import CrewCell from '~components/CrewCell'
import useAppContext from '~context/useAppContext'
import UserCrewModel from '~models/UserCrewModel'

const LINK =
  'https://discord.com/oauth2/authorize?client_id=1026293303584497704&permissions=0&scope=bot+applications.commands'

export default function Crews() {
  const [{ db }] = useAppContext()

  const currentCrews =
    db.crews?.map((campaign) => UserCrewModel.toUserCrew(campaign, db)) || []

  const adminCrews = currentCrews.filter((c) => c.admin) || []
  const playerCrews = currentCrews.filter((c) => !c.admin) || []

  const data = [
    { title: 'Games where I DM', data: adminCrews },
    { title: 'Games where I Play', data: playerCrews },
  ]
  const openUrl = async () => {
    await Linking.openURL(LINK)
  }

  return (
    <Container loading={db.crews === null}>
      <SectionList
        sections={data}
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <CrewCell campaign={item} />} // Fix: Pass item as campaign prop
        renderSectionHeader={({ section: { title } }) => (
          <AppText>{title}</AppText>
        )}
      />
      <AppFAB icon="plus" onPress={openUrl} />
    </Container>
  )
}
