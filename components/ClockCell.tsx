import { useState } from 'react'

import { ActivityIndicator, Button, Card, Text } from 'react-native-paper'

import { Actions, useAppContext } from '~context'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import ClockService from '~services/supabase/ClockService'
import EdgeFunctionService from '~services/supabase/EdgeFunctionService'
import { Clock } from '~types'

export default function ClockCell({ clock }: { clock: Clock['Row'] }) {
  const [, dispatch] = useAppContext()
  const currentCampaign = useCurrentCampaign()
  const [clockLoading, setClockLoading] = useState(false)
  if (!currentCampaign) return null

  const tickUp = async () => {
    setClockLoading(true)
    const newClock = await ClockService.update(clock.id, {
      progress: clock.progress + 1,
    })
    Actions.updateClockStore(dispatch, {
      clock: newClock,
      campaign: currentCampaign!,
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
    Actions.updateClockStore(dispatch, {
      clock: newClock,
      campaign: currentCampaign!,
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
    Actions.updateClockStore(dispatch, {
      clock: newClock,
      campaign: currentCampaign!,
    })

    setClockLoading(false)
  }

  return (
    <Card>
      <Card.Title
        subtitle={
          clockLoading ? (
            <ActivityIndicator />
          ) : (
            `${clock.progress}/${clock.segments} (${clock.segments !== clock.progress ? 'Active' : 'Inactive'})`
          )
        }
        title={clock.name}
      />
      <Card.Content>
        {clock.notify_discord ? (
          <>
            <Text>Notifications Enabled</Text>
            <Button onPress={toggleNotifications}>Disable Notifications</Button>
          </>
        ) : (
          <>
            <Text>Notifications Disabled</Text>
            <Button onPress={toggleNotifications}>Enable Notifications</Button>
          </>
        )}
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
