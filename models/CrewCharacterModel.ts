import { Character, CrewCharacter, DbState } from '~types'

const toCrewCharacter = (
  character: Character['Row'],
  state: Pick<DbState, 'users'>
): CrewCharacter => {
  const user = state.users?.find(({ id }) => id === character.user_id)
  return {
    ...character,
    user: user!,
  }
}

export default { toCrewCharacter }
