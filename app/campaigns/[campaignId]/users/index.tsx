import { View } from 'react-native'

import Container from '~components/Container'
import { PlayerList } from '~components/PlayerList'
import useCurrentCampaign from '~hooks/useCurrentCampaign'

export default function Users() {
  const currentCampaign = useCurrentCampaign()
  if (!currentCampaign) return null

  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <PlayerList link playerList={currentCampaign.gms} label="Game Master" />
        <PlayerList link playerList={currentCampaign.players} label="Player" />
      </View>
    </Container>
  )
}
