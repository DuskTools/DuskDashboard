import { Controller, Control, FieldError } from 'react-hook-form'
import { TextInputProps, Text, TextInput } from 'react-native-paper'

interface Props extends TextInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>
  name: string
  fieldError?: FieldError
  mode?: 'flat' | 'outlined'
}

export default function ControlledTextInput({
  control,
  fieldError,
  name,
  mode,
  ...rest
}: Props) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextInput
            {...rest}
            mode={mode || 'outlined'}
            disabled={field.disabled}
            onBlur={field.onBlur}
            value={field.value as string}
            onChangeText={field.onChange}
          />
        )}
      />
      {fieldError?.message && (
        <Text variant="bodySmall">{fieldError.message}</Text>
      )}
    </>
  )
}
