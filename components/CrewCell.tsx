import { router } from 'expo-router'
import { Card } from 'react-native-paper'

import CharacterList from './CharacterList'
import { UserCrew } from '~types'

export default function CrewCell({ crew }: { crew: UserCrew }) {
  return (
    <Card onPress={() => router.push(`/crews/${crew.id}/`)}>
      <Card.Title title={crew.name} />
      <Card.Content>
        <CharacterList characters={crew.gms} label="Game Master" />
        <CharacterList characters={crew.players} label="Player" />
      </Card.Content>
    </Card>
  )
}
