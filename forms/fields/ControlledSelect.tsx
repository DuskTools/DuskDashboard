import { Controller, Control, FieldError } from 'react-hook-form'
import {
  SegmentedButtons,
  SegmentedButtonsProps,
  Text,
} from 'react-native-paper'

interface Props
  extends Omit<
    SegmentedButtonsProps,
    'onValueChange' | 'multiSelect' | 'value'
  > {
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
              <SegmentedButtons
                {...rest}
                multiSelect={false}
                value={String(field.value)}
                onValueChange={(val) => field.onChange(Number(val))}
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
