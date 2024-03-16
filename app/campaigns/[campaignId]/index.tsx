import { View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'

import Container from '~components/Container'
import { PlayerList } from '~components/PlayerList'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import EdgeFunctionService from '~services/supabase/EdgeFunctionService'

export default function Campaign() {
  const currentCampaign = useCurrentCampaign()
  if (!currentCampaign) return <ActivityIndicator />

  const sendMsg = async () => {
    if (currentCampaign) {
      await EdgeFunctionService.sendMessage({
        notification_channel: currentCampaign?.notification_channel,
        content: 'Hello from the app!',
      })
    }
  }

  const sync = async () => {
    if (currentCampaign) {
      await EdgeFunctionService.syncCampaignWithDiscord({
        discord_guild_id: currentCampaign?.discord_guild_id,
      })
    }
  }

  return (
    <Container auth>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <PlayerList
            link
            playerList={currentCampaign.gms}
            label="Game Master"
          />
          <PlayerList
            link
            playerList={currentCampaign.players}
            label="Player"
          />
        </View>
        <View>
          <Button onPress={sendMsg}>Send Message</Button>
          <Button onPress={sync}>Sync with Discord</Button>
        </View>
      </View>
    </Container>
  )
}
