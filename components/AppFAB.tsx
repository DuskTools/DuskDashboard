import { ComponentProps } from 'react'

import { Portal, FAB } from 'react-native-paper'

export default function AppFAB(props: ComponentProps<typeof FAB>) {
  return (
    <Portal>
      <FAB
        {...props}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 40,
        }}
      />
    </Portal>
  )
}
