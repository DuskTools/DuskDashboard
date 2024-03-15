import { AppDispatch } from '~context'
import supabase from '~supabase'

const subscribe = (_diispatch: AppDispatch) =>
  supabase

    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      (payload) => {
        switch (payload.eventType) {
          case 'UPDATE':
            console.log('UPDATE')
            break
          default:
            console.log('Default')
        }
        console.log(payload)
      }
    )
    .subscribe()

export default { subscribe }
