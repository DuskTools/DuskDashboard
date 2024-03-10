import { useLocalSearchParams } from 'expo-router'

import useAppContext from '../data/useAppContext'

export default function useCurrentCampaign() {
  const { campaignId } = useLocalSearchParams()
  const [{ campaigns }] = useAppContext()

  const currentCampaign = campaigns?.find((c) => c.id === campaignId)

  return currentCampaign
}