import { View } from 'react-native'

import AppText from './AppText'
import UserCell from './UserCell'
import { CrewAppUser } from '~types'

type Props = {
  playerList: CrewAppUser[]
  label: string
  userCellSize?: number
  link?: boolean
}
export function PlayerList({
  playerList,
  label,
  userCellSize,
  link = false,
}: Props) {
  return (
    <View style={{ paddingVertical: 5 }}>
      <AppText variant="headlineLarge">{`${label}${playerList.length > 1 ? 'S' : ''}`}</AppText>
      <View style={{ flexDirection: 'row' }}>
        {playerList.length === 0 ? (
          <AppText>No {`${label}s`}</AppText>
        ) : (
          playerList.map((player) => (
            <UserCell
              key={player.id}
              link={link}
              user={player}
              size={userCellSize || 25}
            />
          ))
        )}
      </View>
    </View>
  )
}
