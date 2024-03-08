import { Session } from '@supabase/supabase-js'

import { Database } from '~dbTypes'

type DatabaseTables = Database['public']['Tables']
type DatabaseTable<T extends keyof DatabaseTables> = DatabaseTables[T]


export type Clock = DatabaseTable<'clocks'>
export type Campaign = DatabaseTable<'campaigns'>
export type User = DatabaseTable<'users'>

export type AuthState = { session: Session | null; hydrated: boolean }
export type AppStore = {
  current_user: User['Row'] | null
  users: User['Row'][]
  campaigns: Campaign['Row'][]
  clocks: Clock['Row'][]
}

export type AppState = {
  store: AppStore
  auth: AuthState
  loading: number
}
