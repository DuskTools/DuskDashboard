import { Controller, Control, FieldError } from 'react-hook-form'
import { Text } from 'react-native-paper'
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'

interface Props extends Omit<PickerSelectProps, 'onValueChange'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>
  name: string
  fieldError?: FieldError
}

export default function ControlledSelect({
  control,
  fieldError,
  name,
  ...rest
}: Props) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          console.log('field', field.value)
          return (
            <RNPickerSelect
              {...rest}
              disabled={field.disabled}
              value={field.value || ''}
              onValueChange={(val) => {
                val !== null && field.onChange(val)
              }}
            />
          )
        }}
      />
      {fieldError?.message && (
        <Text variant="bodySmall">{fieldError.message}</Text>
      )}
    </>
  )
}
