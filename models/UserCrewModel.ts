import { Crew, DbState, UserCrew, CrewAppUser } from '~types'

const toUserCrew = (
  crew: Crew['Row'],
  state: Pick<DbState, 'clocks' | 'characters' | 'users'>
): UserCrew => {
  const matchingCrewId = ({ crew_id }: { crew_id: string | null }) =>
    crew_id && crew_id === crew.id

  const characters =
    state.characters
      ?.filter(matchingCrewId)
      .map(({ user_id, admin, nickname }) => ({
        user: { ...state.users?.find(({ id }) => id === user_id), nickname },

        admin,
      })) || []

  const clocks = state.clocks?.filter(matchingCrewId) || []
  const admin = state.characters?.find(matchingCrewId)?.admin || false
  const gms =
    (characters
      .filter(({ admin }) => admin)
      .map(({ user }) => user) as CrewAppUser[]) || []
  const players =
    (characters
      .filter(({ admin }) => !admin)
      .map(({ user }) => user) as CrewAppUser[]) || []

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
