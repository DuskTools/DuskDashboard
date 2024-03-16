import { View } from 'react-native'

import Container from '~components/Container'
import { PlayerList } from '~components/PlayerList'
import useCurrentCrew from '~hooks/useCurrentCrew'

export default function Users() {
  const currentCrew = useCurrentCrew()
  if (!currentCrew) return null

  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <PlayerList link playerList={currentCrew.gms} label="Game Master" />
        <PlayerList link playerList={currentCrew.players} label="Player" />
      </View>
    </Container>
  )
}
