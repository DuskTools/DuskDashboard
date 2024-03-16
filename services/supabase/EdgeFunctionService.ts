import supabase from '~supabase'

type SendMessageProps = {
  notification_channel: string | null
  content?: string
}

const sendMessage = (body: SendMessageProps) => {
  return (
    body.notification_channel &&
    supabase.functions.invoke('send-message-to-notification-channel', {
      body,
    })
  )
}

type SynCrewWithDiscord = {
  discord_guild_id: string | null
}

const syncCrewWithDiscord = (body: SynCrewWithDiscord) => {
  return (
    body.discord_guild_id &&
    supabase.functions.invoke('sync-campaign-with-discord', {
      body,
    })
  )
}

export default { sendMessage, syncCrewWithDiscord }
