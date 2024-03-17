import Container from '~components/Container'
import useAppContext from '~context/useAppContext'
import NewCrewForm from '~forms/NewCrewForm'
import CrewService from '~services/supabase/CrewService'
import { Crew } from '~types'

export default function NewCrew() {
  const [{ currentUser }] = useAppContext()

  const onCreateCrew = (crewParams: Crew['Insert']) =>
    CrewService.handleCreate(crewParams, currentUser!)

  return (
    <Container>
      <NewCrewForm onSubmit={onCreateCrew} />
    </Container>
  )
}
