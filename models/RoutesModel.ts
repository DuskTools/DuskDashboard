import { Character, Crew, DynamicRoute } from '~types'

type IdOf<T extends { id: string | number }> = Pick<T, 'id'>
export const crew = (crew: IdOf<Crew['Row']>) =>
  `/crews/${crew.id}` as DynamicRoute
export const crewCharacter = (
  crew: IdOf<Crew['Row']>,
  character: IdOf<Character['Row']>
) => `/crews/${crew.id}/characters/${character.id}` as DynamicRoute

export default {
  crew,
  crewCharacter,
}
