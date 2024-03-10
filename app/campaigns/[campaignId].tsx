import { FlatList, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import ClockCell from '~components/ClockCell'
import Container from '~components/Container'
import NewClockCell from '~components/NewClockCell'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import EdgeFunctionService from '~services/supabase/EdgeFunctionService'

export default function Campaign() {
  const currentCampaign = useCurrentCampaign()

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
      {currentCampaign ? (
        <View style={{ flex: 1 }}>
          <Text variant="displayLarge">{currentCampaign.name}</Text>
          <Text variant="displaySmall">Clocks</Text>
          <FlatList
            contentContainerStyle={{ gap: 20 }}
            data={[...currentCampaign.clocks, 'new']}
            renderItem={({ item }) =>
              typeof item === 'string' ? (
                <NewClockCell />
              ) : (
                <ClockCell clock={item} />
              )
            }
            ListEmptyComponent={() => <Text>No Clocks</Text>}
          />
          <Button onPress={sendMsg}>Send Message</Button>
          <Button onPress={sync}>Sync with Discord</Button>
        </View>
      ) : (
        <Text>No Campaign found</Text>
      )}
    </Container>
  )
}
