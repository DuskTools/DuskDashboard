export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      characters: {
        Row: {
          admin: boolean
          created_at: string
          crew_id: string | null
          id: number
          nickname: string | null
          primary: boolean
          user_id: string
        }
        Insert: {
          admin?: boolean
          created_at?: string
          crew_id?: string | null
          id?: number
          nickname?: string | null
          primary?: boolean
          user_id: string
        }
        Update: {
          admin?: boolean
          created_at?: string
          crew_id?: string | null
          id?: number
          nickname?: string | null
          primary?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_campaign_user_campaign_id_fkey'
            columns: ['crew_id']
            isOneToOne: false
            referencedRelation: 'crews'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_campaign_user_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      clocks: {
        Row: {
          active: boolean
          created_at: string
          crew_id: string
          id: string
          link: string | null
          name: string
          notify_discord: boolean
          progress: number
          segments: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          crew_id?: string
          id?: string
          link?: string | null
          name: string
          notify_discord?: boolean
          progress?: number
          segments: number
        }
        Update: {
          active?: boolean
          created_at?: string
          crew_id?: string
          id?: string
          link?: string | null
          name?: string
          notify_discord?: boolean
          progress?: number
          segments?: number
        }
        Relationships: [
          {
            foreignKeyName: 'public_clocks_campaign_id_fkey'
            columns: ['crew_id']
            isOneToOne: false
            referencedRelation: 'crews'
            referencedColumns: ['id']
          },
        ]
      }
      crews: {
        Row: {
          created_at: string
          discord_guild_id: string | null
          id: string
          name: string
          notification_channel: string | null
        }
        Insert: {
          created_at?: string
          discord_guild_id?: string | null
          id?: string
          name: string
          notification_channel?: string | null
        }
        Update: {
          created_at?: string
          discord_guild_id?: string | null
          id?: string
          name?: string
          notification_channel?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string
          avatar_url: string | null
          created_at: string
          discord_id: string | null
          discord_refresh_token: string | null
          discord_token: string | null
          display_name: string
          email: string | null
          id: string
        }
        Insert: {
          auth_id: string
          avatar_url?: string | null
          created_at?: string
          discord_id?: string | null
          discord_refresh_token?: string | null
          discord_token?: string | null
          display_name?: string
          email?: string | null
          id?: string
        }
        Update: {
          auth_id?: string
          avatar_url?: string | null
          created_at?: string
          discord_id?: string | null
          discord_refresh_token?: string | null
          discord_token?: string | null
          display_name?: string
          email?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_users_auth_id_fkey'
            columns: ['auth_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_character_primary: {
        Args: {
          character_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
