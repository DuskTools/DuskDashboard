import { Linking } from 'react-native'
import { Button } from 'react-native-paper'

const LINK =
  'https://discord.com/oauth2/authorize?client_id=1026293303584497704&permissions=0&scope=bot+applications.commands'
export default function BotInviteLink() {
  const openUrl = async () => {
    await Linking.openURL(LINK)
  }

  return <Button onPress={openUrl}>Invite Dusk Tools to your server</Button>
}
