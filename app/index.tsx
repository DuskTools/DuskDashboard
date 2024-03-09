import { useEffect } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

// import BotInviteLink from '~components/BotInviteLink'
import Container from '~components/Container'
import { Actions, useAppContext } from '~context'
import useLoading from '~hooks/useLoading'
import CampaignService from '~services/supabase/CampaignService'

export default function Dashboard() {
  const [state, dispatch] = useAppContext()
  const { loadingHarness } = useLoading()

  useEffect(() => {
    const processUser = async () => {
      if (state.currentUser) {
        await loadingHarness(async () => {
          const campaigns = await CampaignService.campaignsForUser(
            state.currentUser!
          )
          Actions.setCampaigns(dispatch, campaigns)
        })
      }
    }
    processUser()
  }, [state.currentUser])

  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        {state.campaigns.length ? (
          state.campaigns.map((campaign) => (
            <Text key={campaign.id}>{campaign.name}</Text>
          ))
        ) : (
          <Text>No Campaigns Found</Text>
        )}
      </ScrollView>
    </Container>
  )
}
