import { useState } from 'react'

import { Pressable } from 'react-native'
import { Card, Modal, Portal } from 'react-native-paper'

import { Actions, useAppContext } from '~context'
import NewClockForm from '~forms/NewClockForm'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import useLoading from '~hooks/useLoading'
import ClockService from '~services/supabase/ClockService'
import { Clock } from '~types'

export default function NewClockCell() {
  const [visible, setVisible] = useState(false)
  const [, dispatch] = useAppContext()
  const currentCampaign = useCurrentCampaign()
  const { loadingHarness } = useLoading()

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const onSubmit = async (clockParams: Clock['Insert']) =>
    loadingHarness(async () => {
      const newClock = await ClockService.create(clockParams)
      Actions.addClock(dispatch, {
        clock: newClock,
        campaign: currentCampaign!,
      })
    })
  return (
    <>
      <Pressable onPress={showModal}>
        <Card mode="outlined">
          <Card.Title title="Add a new Clock" />
        </Card>
      </Pressable>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
            margin: 20,
          }}
        >
          <NewClockForm onSubmit={onSubmit} />
        </Modal>
      </Portal>
    </>
  )
}
