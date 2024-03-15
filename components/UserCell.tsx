import { Image, View } from 'react-native'

import AppText from './AppText'
import { CampaignAppUser } from '~types'

export default function UserCell({
  user,
  size = 50,
}: {
  user: CampaignAppUser
  size?: number
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: size / 2,
      }}
    >
      {user.avatar_url && (
        <Image
          style={{ borderRadius: 50, height: size, width: size }}
          source={{
            uri: user.avatar_url,
          }}
        />
      )}
      <AppText>{user.nickname || user.discord_global_name}</AppText>
    </View>
  )
}
