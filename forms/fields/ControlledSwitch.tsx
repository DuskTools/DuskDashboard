import { Controller, Control, FieldError } from 'react-hook-form'
import { Switch, SwitchProps, Text } from 'react-native-paper'

interface Props
  extends Omit<SwitchProps, 'onValueChange' | 'multiSelect' | 'value'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>
  name: string
  fieldError?: FieldError
  label?: string
}

export default function ControlledSelect({
  control,
  fieldError,
  name,
  label,
  ...rest
}: Props) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <>
              {label && <Text variant="labelSmall">{label}</Text>}
              <Switch
                {...rest}
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              />
            </>
          )
        }}
      />
      {fieldError?.message && (
        <Text variant="bodySmall">{fieldError.message}</Text>
      )}
    </>
  )
}
