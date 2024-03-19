import { View } from 'react-native'

import AppText from './AppText'
import UserCell from './UserCell'
import { CrewCharacter } from '~types'

type Props = {
  characters: CrewCharacter[]
  label: string
  userCellSize?: number
  link?: boolean
}
export default function CharacterList({
  characters,
  label,
  userCellSize,
}: Props) {
  return (
    <View style={{ paddingVertical: 5 }}>
      <AppText variant="headlineLarge">{`${label}${characters.length > 1 ? 'S' : ''}`}</AppText>
      <View style={{ flexDirection: 'row' }}>
        {characters.length === 0 ? (
          <AppText>No {`${label}s`}</AppText>
        ) : (
          characters.map((character) => (
            <UserCell
              key={character.id}
              user={character.user}
              size={userCellSize || 25}
            />
          ))
        )}
      </View>
    </View>
  )
}
