import { router } from 'expo-router'

import { Database } from '~dbTypes'

type DatabaseTables = Database['public']['Tables']
type DatabaseTable<T extends keyof DatabaseTables> = DatabaseTables[T]
type DatabaseTypes<T extends keyof DatabaseTables> = {
  Row: DatabaseTable<T>['Row']
  Insert: Omit<DatabaseTable<T>['Insert'], 'createdAt' | 'id'>
  Update: Omit<DatabaseTable<T>['Update'], 'createdAt' | 'id'>
}

export type DynamicRoute = Parameters<typeof router.push<string>>[0]

export type Clock = DatabaseTypes<'clocks'>
export type Crew = DatabaseTypes<'crews'>
export type User = DatabaseTypes<'users'>
export type Character = DatabaseTypes<'characters'>

export type CrewCharacter = {
  user: Omit<AppUser, 'discord_token' | 'discord_refresh_token'>
} & Character['Row']

export type UserCrew = Crew['Row'] & {
  gms: CrewCharacter[]
  players: CrewCharacter[]
  admin: boolean
  clocks: Clock['Row'][]
  hasDiscordIntegration: boolean
}

export type AppUser = Pick<
  User['Row'],
  'id' | 'discord_id' | 'avatar_url' | 'created_at' | 'display_name'
>

export type DbState = {
  crews: Crew['Row'][] | null
  clocks: Clock['Row'][] | null
  characters: Character['Row'][] | null
  users: AppUser[] | null
}

export type AppState = {
  currentUser: User['Row'] | null
  db: DbState
  authLoaded: boolean
  loading: number
}
