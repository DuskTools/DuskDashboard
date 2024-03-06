import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

import { Database } from '~dbTypes'

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL!
const supabaseKey = process.env.EXPO_PUBLIC_API_ANON_KEY!

export default createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
