import { View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'

import BotInviteLink from '~components/BotInviteLink'
import Container from '~components/Container'
import useCurrentCrew from '~hooks/useCurrentCrew'
import EdgeFunctionService from '~services/supabase/EdgeFunctionService'

export default function Crew() {
  const currentCrew = useCurrentCrew()
  if (!currentCrew) return <ActivityIndicator />

  const sendMsg = async () => {
    if (currentCrew) {
      await EdgeFunctionService.sendMessage({
        notification_channel: currentCrew?.notification_channel,
        content: 'Hello from the app!',
      })
    }
  }

  const sync = async () => {
    if (currentCrew) {
      await EdgeFunctionService.syncCrewWithDiscord({
        discord_guild_id: currentCrew?.discord_guild_id,
      })
    }
  }

  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {currentCrew.hasDiscordIntegration ? (
          <Button onPress={sync}>Sync with Discord</Button>
        ) : (
          <BotInviteLink />
        )}
        <Button onPress={sendMsg}>Send Message</Button>
      </View>
    </Container>
  )
}
