import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Card } from 'react-native-paper'
import { z } from 'zod'

import ControlledSelect from './fields/ControlledSelect'
import ControlledTextInput from './fields/ControlledTextInput'
import { Clock } from '~types'

type Props = {
  onSubmit: (props: Clock['Insert']) => void
}

const defaultValues: Clock['Insert'] = {
  name: '',
  segments: 8,
  notify_discord: true,
}

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
  segments: z.string().min(1, 'Segments is required'),
})

export default function NewClockForm(props: Props) {
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
        <ControlledSelect
          control={control}
          name="segments"
          items={[
            { label: '4', value: 4 },
            { label: '6', value: 6 },
            { label: '8', value: 8 },
            { label: '10', value: 10 },
            { label: '12', value: 12 },
          ]}
          fieldError={errors.segments}
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleSubmit(props.onSubmit)}>Make Clock</Button>
      </Card.Actions>
    </Card>
  )
}
