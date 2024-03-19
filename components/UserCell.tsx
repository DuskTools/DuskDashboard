import { Image, View } from 'react-native'

import AppText from './AppText'
import useAppTheme from '~theme/useAppTheme'
import { AppUser } from '~types'

export default function UserCell({
  user: { avatar_url, display_name },
  size = 50,
}: {
  user: Pick<AppUser, 'avatar_url' | 'display_name'>
  size?: number
}) {
  const theme = useAppTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: size / 2,
      }}
    >
      {avatar_url && (
        <Image
          style={{ borderRadius: 50, height: size, width: size }}
          source={{
            uri: avatar_url,
          }}
        />
      )}
      <AppText style={{ color: theme.colors.primary }}>{display_name}</AppText>
    </View>
  )
}
