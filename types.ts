import { Session } from '@supabase/supabase-js'

import { Database } from '~dbTypes'

export type ClockUpdateParams = Database['public']['Tables']['clocks']['Update']
export type ClockCreateParams = Database['public']['Tables']['clocks']['Insert']
export type Clock = Database['public']['Tables']['clocks']['Row']

export interface User {
  provider: unknown
  url: string | null
}

export type AuthState = { session: Session | null; hydrated: boolean }
export type AppState = {
  auth: AuthState
  loading: number
}
