import Actions, { AppDispatch } from '~context/actions'
import supabase from '~supabase'

const subscribe = (dispatch: AppDispatch) =>
  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      (payload) => {
        Actions.incrementLoading(dispatch)
        switch (payload.eventType) {
          case 'DELETE':
            Actions.deleteRow(dispatch, payload)
            break
          case 'INSERT':
            Actions.addRow(dispatch, payload)
            break
          case 'UPDATE':
            Actions.updateRow(dispatch, payload)
            break
        }
        Actions.decrementLoading(dispatch)
      }
    )
    .subscribe()

export default { subscribe }
