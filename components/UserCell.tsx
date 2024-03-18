import { PropsWithChildren } from 'react'

import { Link } from 'expo-router'
import { Image, View } from 'react-native'

import AppText from './AppText'
import useCurrentCrew from '~hooks/useCurrentCrew'
import useAppTheme from '~theme/useAppTheme'
import { CrewAppUser, DynamicRoute } from '~types'

export default function UserCell({
  user,
  size = 50,
  link = false,
}: {
  user: CrewAppUser
  size?: number
  link?: boolean
}) {
  const currentCrew = useCurrentCrew()
  const theme = useAppTheme()

  const linkPath =
    `/crews/${currentCrew?.id}/characters/${user.id}` as DynamicRoute
  const LinkWrapper = ({ children }: PropsWithChildren) => (
    <Link href={linkPath}>{children}</Link>
  )

  const renderedComponent = (
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
      <AppText style={{ color: theme.colors.primary }}>
        {user.nickname || user.display_name}
      </AppText>
    </View>
  )

  return link ? (
    <LinkWrapper>{renderedComponent}</LinkWrapper>
  ) : (
    renderedComponent
  )
}
