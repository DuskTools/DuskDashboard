import CrewCharacterModel from './CrewCharacterModel'
import { Crew, CrewCharacter, DbState, UserCrew } from '~types'

const toUserCrew = (
  crew: Crew['Row'],
  state: Pick<DbState, 'clocks' | 'characters' | 'users'>
): UserCrew => {
  const matchingCrewId = ({ crew_id }: { crew_id: string | null }) =>
    crew_id && crew_id === crew.id

  const characters: CrewCharacter[] =
    state.characters
      ?.filter(matchingCrewId)
      .map((c) => CrewCharacterModel.toCrewCharacter(c, state)) || []

  const clocks = state.clocks?.filter(matchingCrewId) || []
  const admin = state.characters?.find(matchingCrewId)?.admin || false
  const gms = characters.filter(({ admin }) => admin) || []
  const players = characters.filter(({ admin }) => !admin) || []

  const hasDiscordIntegration =
    !!crew.discord_guild_id && !!crew.notification_channel

  return {
    ...crew,
    clocks,
    admin,
    gms,
    players,
    hasDiscordIntegration,
  }
}

export default { toUserCrew }
