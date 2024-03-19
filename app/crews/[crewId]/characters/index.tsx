import { View } from 'react-native'

import CharacterList from '~components/CharacterList'
import Container from '~components/Container'
import useCurrentCrew from '~hooks/useCurrentCrew'

export default function Users() {
  const currentCrew = useCurrentCrew()
  if (!currentCrew) return null

  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <CharacterList link characters={currentCrew.gms} label="Game Master" />
        <CharacterList link characters={currentCrew.players} label="Player" />
      </View>
    </Container>
  )
}
