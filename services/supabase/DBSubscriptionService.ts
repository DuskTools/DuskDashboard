import supabase from '~supabase'

const subscribe = () => {
  const subscriptions = supabase

    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      (payload) => {
        console.log(payload)
      }
    )
    .subscribe()

  return subscriptions
}

export default { subscribe }
