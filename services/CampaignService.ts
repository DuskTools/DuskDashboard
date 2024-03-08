import axios from 'axios'

import supabase from '~supabase'
import { AuthState } from '~types'


async function findUserCampaigns(
  session: Exclude<AuthState['session'], undefined | null>
) {
  try {

    const response = await axios.get(
      'https://www.discord.com/api/v10/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${session.user.user_metadata.provider_token}`,
        },
      }
    )
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

async function findOrCreateByDiscordId(discordGuildId: string) {
  const existingCampaign = await findByDiscordId(discordGuildId)
  if (existingCampaign) {
    return existingCampaign
  }

  const { data, error } = await supabase
    .from('campaigns')
    .insert({ discord_guild_id: discordGuildId })
    .select()
    .single()
  if (error) {
    console.log('Find or create campaign error')
    console.log(error)
  }

  return data!
}

async function findByDiscordId(discordGuildId: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select()
    .eq('discord_guild_id', discordGuildId)
    .limit(1)
    .single()

  if (error) {
    console.log('Find campaign error')
    console.log(error.message)
  }

  if (!data) {
    console.log('No Campaign Found for ', discordGuildId)
  }

  return data
}

export default { findOrCreateByDiscordId, findUserCampaigns }
