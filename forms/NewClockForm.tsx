import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Controller, useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { Button, Card } from 'react-native-paper'

import { Clock } from '~types'

type Props = {
  onSubmit: (props: Clock['Insert']) => void
}

const defaultValues: Clock['Insert'] = {
  name: '',
  segments: 8,
  progress: 0,
  notify_discord: true,
}

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
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
    <Card>
      <Card.Title title="New Clock" />
      <Card.Content>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="The Gan"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleSubmit(props.onSubmit)}>Make a new Clock</Button>
      </Card.Actions>
    </Card>
  )
}
