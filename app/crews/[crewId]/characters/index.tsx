import CharacterList from '~components/CharacterList'
import Container from '~components/Container'
import useCurrentCrew from '~hooks/useCurrentCrew'

export default function Users() {
  const currentCrew = useCurrentCrew()
  if (!currentCrew) return null

  return (
    <Container auth>
      <CharacterList link characters={currentCrew.gms} label="Game Master" />
      <CharacterList link characters={currentCrew.players} label="Player" />
    </Container>
  )
}
