import { zodResolver } from '@hookform/resolvers/zod'
import { useGlobalSearchParams } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Button, Card } from 'react-native-paper'
import { z } from 'zod'

import ControlledTextInput from './fields/ControlledTextInput'
import { Crew } from '~types'

type Props = {
  onSubmit: (props: Crew['Insert']) => void
}

const defaultValues: Crew['Insert'] = {
  name: '',
}

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
})

export default function NewCrewForm(props: Props) {
  const { guildId } = useGlobalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  })

  return (
    <Card mode="contained">
      <Card.Title title="New Clock" />
      <Card.Content>
        <ControlledTextInput
          control={control}
          name="name"
          fieldError={errors.name}
        />
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={handleSubmit((values) =>
            props.onSubmit({
              ...values,
              discord_guild_id: guildId as string | null,
            })
          )}
        >
          Make Crew
        </Button>
      </Card.Actions>
    </Card>
  )
}
