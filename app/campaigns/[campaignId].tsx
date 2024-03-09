import { Button, Text } from 'react-native-paper'

import Container from '~components/Container'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import supabase from '~supabase'

export default function Campaign() {
  const currentCampaign = useCurrentCampaign()

  const sendMsg = async () => {
    if (currentCampaign) {
      await supabase.functions.invoke('send-message-to-notification-channel', {
        body: {
          notification_channel: currentCampaign?.notification_channel,
        },
      })
    }
  }

  return (
    <Container auth>
      {currentCampaign ? (
        <>
          <Text>{currentCampaign.name}</Text>
          <Button onPress={sendMsg}>Send Message</Button>
        </>
      ) : (
        <Text>No Campaign found</Text>
      )}
    </Container>
  )
}
