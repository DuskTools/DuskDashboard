import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

import { Database } from '~dbTypes'

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_API_ANON_KEY!
const supabaseSecureKey = process.env.EXPO_PUBLIC_API_ANON_KEY!

export const supabaseAnon = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseSecureKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
)
