import { useState } from 'react'

import { Button, Card, Switch } from 'react-native-paper'

import AppText from './AppText'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import ClockService from '~services/supabase/ClockService'
import EdgeFunctionService from '~services/supabase/EdgeFunctionService'
import { Clock } from '~types'

export default function ClockCell({ clock }: { clock: Clock['Row'] }) {
  const currentCampaign = useCurrentCampaign()
  const [clockLoading, setClockLoading] = useState(false)
  if (!currentCampaign) return null

  const tickUp = async () => {
    setClockLoading(true)
    const newProgress = clock.progress + 1
    const newClock = await ClockService.update(clock.id, {
      progress: newProgress,
    })
    newClock.notify_discord &&
      EdgeFunctionService.sendMessage({
        notification_channel: currentCampaign.notification_channel,
        content: `**${newClock.name}** has ticked up to ${newClock.progress}/${newClock.segments}`,
      })
    setClockLoading(false)
  }

  const tickDown = async () => {
    setClockLoading(true)
    const newProgress = clock.progress - 1 || 0
    const newClock = await ClockService.update(clock.id, {
      progress: newProgress,
    })
    newClock.notify_discord &&
      EdgeFunctionService.sendMessage({
        notification_channel: currentCampaign.notification_channel,
        content: `**${newClock.name}** has ticked down to ${newClock.progress}/${newClock.segments}`,
      })
    setClockLoading(false)
  }

  const toggleNotifications = async () => {
    setClockLoading(true)
    const newClock = await ClockService.update(clock.id, {
      notify_discord: !clock.notify_discord,
    })
    EdgeFunctionService.sendMessage({
      notification_channel: currentCampaign.notification_channel,
      content: `Discord Notifications for **${newClock.name}** have been ${newClock.notify_discord ? 'enabled' : 'disabled'}`,
    })
    setClockLoading(false)
  }

  const toggleActive = async () => {
    setClockLoading(true)
    await ClockService.update(clock.id, {
      active: !clock.active,
    })
    setClockLoading(false)
  }

  return (
    <Card disabled={clockLoading}>
      <Card.Title
        subtitle={`${clock.progress}/${clock.segments}`}
        title={clock.name}
      />
      <Card.Content>
        <AppText>Active?</AppText>
        <Switch value={clock.active} onValueChange={toggleActive} />
        <AppText>Notify Discord?</AppText>
        <Switch
          value={clock.notify_discord}
          onValueChange={toggleNotifications}
        />
      </Card.Content>
      {currentCampaign.admin && (
        <Card.Actions>
          <Button
            disabled={clockLoading || clock.progress === clock.segments}
            onPress={tickUp}
          >
            Tick Up
          </Button>
          <Button
            disabled={clockLoading || clock.progress === 0}
            onPress={tickDown}
          >
            Tick Down
          </Button>
        </Card.Actions>
      )}
    </Card>
  )
}
