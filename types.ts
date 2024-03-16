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
export type Campaign = DatabaseTypes<'campaigns'>
export type User = DatabaseTypes<'users'>
export type CampaignUser = DatabaseTypes<'campaign_user'>

export type CampaignAppUser = Omit<
  AppUser,
  'discord_token' | 'discord_refresh_token'
> & {
  nickname?: string
}

export type UserCampaign = Campaign['Row'] & {
  gms: CampaignAppUser[]
  players: CampaignAppUser[]
  admin: boolean
  clocks: Clock['Row'][]
}

export type AppUser = Pick<
  User['Row'],
  'id' | 'discord_id' | 'avatar_url' | 'created_at' | 'discord_global_name'
>

export type DbState = {
  campaigns: Campaign['Row'][] | null
  clocks: Clock['Row'][] | null
  campaignUsers: CampaignUser['Row'][] | null
  users: AppUser[] | null
}

export type AppState = {
  currentUser: User['Row'] | null
  db: DbState
  authLoaded: boolean
  loading: number
}
