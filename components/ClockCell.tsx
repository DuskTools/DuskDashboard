import { useState } from 'react'

import { ActivityIndicator, Button, Card } from 'react-native-paper'

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
      active: clock.progress + 1 !== clock.segments,
    })
    Actions.updateClockStore(dispatch, {
      clock: newClock,
      campaign: currentCampaign!,
    })
    EdgeFunctionService.sendMessage({
      notification_channel: currentCampaign.discord_guild_id,
      content: `**${newClock.name}** has ticked up to ${newClock.progress}/${newClock.segments}`,
    })
    setClockLoading(false)
  }

  const tickDown = async () => {
    setClockLoading(true)
    const newClock = await ClockService.update(clock.id, {
      progress: clock.progress - 1 || 0,
    })
    Actions.updateClockStore(dispatch, {
      clock: newClock,
      campaign: currentCampaign!,
    })
    EdgeFunctionService.sendMessage({
      notification_channel: currentCampaign.discord_guild_id,
      content: `**${newClock.name}** has ticked down to ${newClock.progress}/${newClock.segments}`,
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
            `${clock.progress}/${clock.segments} (${clock.active ? 'Active' : 'Inactive'})`
          )
        }
        title={clock.name}
      />
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
    </Card>
  )
}
