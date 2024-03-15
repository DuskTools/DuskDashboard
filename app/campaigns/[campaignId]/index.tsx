import { View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'

import AppText from '~components/AppText'
import Container from '~components/Container'
import UserCell from '~components/UserCell'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import EdgeFunctionService from '~services/supabase/EdgeFunctionService'
import { CampaignAppUser } from '~types'

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
          <PlayerList playerList={currentCampaign.gms} label="Game Master" />
          <PlayerList playerList={currentCampaign.players} label="Player" />
        </View>
        <View>
          <Button onPress={sendMsg}>Send Message</Button>
          <Button onPress={sync}>Sync with Discord</Button>
        </View>
      </View>
    </Container>
  )
}

function PlayerList({
  playerList,
  label,
}: {
  playerList: CampaignAppUser[]
  label: string
}) {
  if (playerList.length === 0) return null
  return (
    <>
      <AppText variant="headlineLarge">{`${label}${playerList.length > 1 ? 'S' : ''}`}</AppText>
      <View style={{ flexDirection: 'row' }}>
        {playerList.map((player) => (
          <UserCell key={player.id} user={player} size={25} />
        ))}
      </View>
    </>
  )
}
