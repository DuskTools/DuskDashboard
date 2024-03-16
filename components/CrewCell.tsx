import { router } from 'expo-router'
import { Card } from 'react-native-paper'

import { PlayerList } from './PlayerList'
import { UserCrew } from '~types'

export default function CrewCell({ crew }: { crew: UserCrew }) {
  return (
    <Card onPress={() => router.push(`/crews/${crew.id}/`)}>
      <Card.Title title={crew.name} />
      <Card.Content>
        <PlayerList playerList={crew.gms} label="Game Master" />
        <PlayerList playerList={crew.players} label="Player" />
      </Card.Content>
    </Card>
  )
}
