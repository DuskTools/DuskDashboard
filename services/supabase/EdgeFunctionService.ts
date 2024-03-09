import supabase from '~supabase'

type SendMessageProps = {
  notification_channel: string
  content?: string
}

const sendMessage = (body: SendMessageProps) => {
  return supabase.functions.invoke('send-message-to-notification-channel', {
    body,
  })
}

type SynCampaignWithDiscord = {
  discord_guild_id: string
}

const syncCampaignWithDiscord = (body: SynCampaignWithDiscord) => {
  return supabase.functions.invoke('sync-campaign-with-discord', {
    body
  })
}

export default { sendMessage, syncCampaignWithDiscord }
