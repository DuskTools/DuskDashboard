import { Controller, Control, FieldError } from 'react-hook-form'
import { SegmentedButtons, SegmentedButtonsProps } from 'react-native-paper'

import AppText from '~components/AppText'

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
              {label && <AppText variant="labelSmall">{label}</AppText>}
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
        <AppText variant="bodySmall">{fieldError.message}</AppText>
      )}
    </>
  )
}
