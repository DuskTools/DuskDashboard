import { Database } from '~dbTypes'

type DatabaseTables = Database['public']['Tables']
type DatabaseTable<T extends keyof DatabaseTables> = DatabaseTables[T]
type DatabaseTypes<T extends keyof DatabaseTables> = {
  Row: DatabaseTable<T>['Row']
  Insert: Omit<DatabaseTable<T>['Insert'], 'createdAt' | 'id'>
  Update: Omit<DatabaseTable<T>['Update'], 'createdAt' | 'id'>
}

export type Clock = DatabaseTypes<'clocks'>
export type Campaign = DatabaseTypes<'campaigns'>
export type User = DatabaseTypes<'users'>

export type UserCampaign = Campaign['Row'] & {
  admin: boolean
}

export type AppState = {
  currentUser: User['Row'] | null
  users: User['Row'][]
  campaigns: UserCampaign[]
  clocks: Clock['Row'][]
  loading: number
}
