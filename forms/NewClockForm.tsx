import { Controller, useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'

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

export default function NewClockForm(props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  })
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
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
    </View>
  )
}
