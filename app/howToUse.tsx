import { PropsWithChildren } from 'react'

import { View } from 'react-native'

import AppText from '~components/AppText'
import Container from '~components/Container'

export default function Home() {
  const instructions = [
    'Invite the bot to your Server',
    'Run /init on your server',
    'have your players run /register to register as players in your campaign',
    'visit dusktools.com and log in to manage clocks and view your campaign',
  ]
  return (
    <Container>
      <AppText variant="headlineSmall">How to use DuskTools</AppText>
      {instructions.map((instruction, index) => (
        <ListItem key={index} number={index + 1}>
          {instruction}
        </ListItem>
      ))}
    </Container>
  )
}

function ListItem({ children, number }: PropsWithChildren<{ number: number }>) {
  const child =
    typeof children === 'string' ? (
      <AppText variant="bodySmall">{children}</AppText>
    ) : (
      children
    )
  return (
    <View style={{ flexDirection: 'row' }}>
      <AppText variant="bodySmall">{number})</AppText>
      {child}
    </View>
  )
}
