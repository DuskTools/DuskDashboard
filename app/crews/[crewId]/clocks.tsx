import { useState } from 'react'

import { SectionList } from 'react-native'
import { Modal, Portal } from 'react-native-paper'

import AppFAB from '~components/AppFAB'
import AppText from '~components/AppText'
import ClockCell from '~components/ClockCell'
import Container from '~components/Container'
import NewClockForm from '~forms/NewClockForm'
import useCurrentCrew from '~hooks/useCurrentCrew'
import useLoading from '~hooks/useLoading'
import ClockService from '~services/supabase/ClockService'
import { Clock } from '~types'

export default function Foo() {
  const [visible, setVisible] = useState(false)
  const { loadingHarness } = useLoading()
  const currentCrew = useCurrentCrew()
  if (!currentCrew) return null
  const { clocks } = currentCrew

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const activeClocks = clocks.filter(({ active }) => active)
  const inactiveClocks = clocks.filter(({ active }) => !active)
  const data = [
    { title: 'Active Clocks', data: activeClocks },
    { title: 'Inactive Clocks', data: inactiveClocks },
  ]

  const onCreateClock = async (clockParams: Clock['Insert']) =>
    loadingHarness(async () => {
      await ClockService.create({
        ...clockParams,
        crew_id: currentCrew!.id,
      })
      hideModal()
    })

  return (
    <Container auth>
      <SectionList
        sections={data}
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ClockCell clock={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <AppText>{title}</AppText>
        )}
      />
      <AppFAB icon="plus" onPress={showModal} />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
            margin: 20,
          }}
        >
          <NewClockForm onSubmit={onCreateClock} />
        </Modal>
      </Portal>
    </Container>
  )
}
