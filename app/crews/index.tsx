import { useState } from 'react'

import { SectionList } from 'react-native'
import { Portal, Modal } from 'react-native-paper'

import AppFAB from '~components/AppFAB'
import AppText from '~components/AppText'
import Container from '~components/Container'
import CrewCell from '~components/CrewCell'
import useAppContext from '~context/useAppContext'
import NewCrewForm from '~forms/NewCrewForm'
import UserCrewModel from '~models/UserCrewModel'
import CrewService from '~services/supabase/CrewService'
import { Crew } from '~types'

export default function Crews() {
  const [visible, setVisible] = useState(false)
  const [{ db, currentUser }] = useAppContext()

  const currentCrews =
    db.crews?.map((crew) => UserCrewModel.toUserCrew(crew, db)) || []

  const adminCrews = currentCrews.filter((c) => c.admin) || []
  const playerCrews = currentCrews.filter((c) => !c.admin) || []

  const data = [
    { title: 'Games where I DM', data: adminCrews },
    { title: 'Games where I Play', data: playerCrews },
  ]

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const onCreateCrew = async (crewParams: Crew['Insert']) => {
    await CrewService.handleCreate(crewParams, currentUser!)
  }

  return (
    <>
      <Container loading={db.crews === null}>
        <SectionList
          sections={data}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <CrewCell crew={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <AppText>{title}</AppText>
          )}
        />
        <AppFAB icon="plus" onPress={showModal} />
      </Container>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
            margin: 20,
          }}
        >
          <NewCrewForm onSubmit={onCreateCrew} />
        </Modal>
      </Portal>
    </>
  )
}
