import { PropsWithChildren } from 'react'

import { Link } from 'expo-router'
import { Image, View } from 'react-native'

import AppText from './AppText'
import useCurrentCampaign from '~hooks/useCurrentCampaign'
import { CampaignAppUser, DynamicRoute } from '~types'

export default function UserCell({
  user,
  size = 50,
  link,
}: {
  user: CampaignAppUser
  size?: number
  link: boolean
}) {
  const currentCampaign = useCurrentCampaign()

  const linkPath =
    `/campaigns/${currentCampaign?.id}/users/${user.id}` as DynamicRoute
  const LinkWrapper = ({ children }: PropsWithChildren) => (
    <Link href={linkPath}>{children}</Link>
  )

  const renderedComponent = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
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

  return link ? (
    <LinkWrapper>{renderedComponent}</LinkWrapper>
  ) : (
    renderedComponent
  )
}
