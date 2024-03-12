import { View, FlatList } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'

import ClockCell from '~components/ClockCell'
import Container from '~components/Container'
import NewClockCell from '~components/NewClockCell'
import useCurrentCampaign from '~hooks/useCurrentCampaign'

export default function Foo() {
  const currentCampaign = useCurrentCampaign()
  if (!currentCampaign) return null
  const { clocks } = currentCampaign

  const activeClocks = clocks.filter(
    ({ segments, progress }) => segments !== progress
  )
  const inactiveClocks = clocks.filter(
    ({ segments, progress }) => segments === progress
  )

  return (
    <Container auth>
      <View style={{ flex: 1 }}>
        <Text variant="headlineSmall">Active Clocks</Text>
        <FlatList
          contentContainerStyle={{ gap: 20 }}
          data={[...activeClocks, 'new']}
          renderItem={({ item }) =>
            typeof item === 'string' ? (
              <NewClockCell />
            ) : (
              <ClockCell clock={item} />
            )
          }
          ListEmptyComponent={() => <NewClockCell />}
        />
        <Divider />
        <Text variant="headlineSmall">Inactive Clocks</Text>
        <FlatList
          contentContainerStyle={{ gap: 20 }}
          data={inactiveClocks}
          renderItem={({ item }) => <ClockCell clock={item} />}
          ListEmptyComponent={() => (
            <Card>
              <Text>No Inactive Clocks</Text>
            </Card>
          )}
        />
      </View>
    </Container>
  )
}
