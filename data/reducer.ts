import {
  ActionType,
  AddRowAction,
  DeleteRowAction,
  ReducerAction,
  UpdateRowAction,
} from './actions'
import initialState from './initialState'
import Logger from '~services/Logger'
import { AppState, DbState } from '~types'

export default function reducer(
  state: AppState,
  action: ReducerAction
): AppState {
  Logger.log('Reducer called with state:', state, 'and action:', action)
  switch (action.type) {
    case ActionType.ADD_ROW:
      return handleAddRow(state, action)
    case ActionType.DELETE_ROW:
      return handleDeleteRow(state, action)
    case ActionType.UPDATE_ROW:
      return handleUpdateRow(state, action)
    case ActionType.SET_LOGIN_PAYLOAD:
      return {
        ...state,
        ...action.payload,
      }
    case ActionType.SET_AUTH_LOADED:
      return {
        ...state,
        authLoaded: true,
      }
    case ActionType.CLEAR_USER:
      return {
        ...state,
        currentUser: initialState.currentUser,
        db: initialState.db,
      }
    case ActionType.INCREMENT_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
      }
    case ActionType.DECREMENT_LOADING:
      return {
        ...state,
        loading: state.loading - 1,
      }
    default:
      throw new Error('Invalid action type')
  }
}

const handleAddRow = (state: AppState, action: AddRowAction) => {
  const { new: record, table } = action.payload
  const { db } = state
  const tableData = db[table as keyof DbState]

  if (!tableData) {
    return state
  }

  return {
    ...state,
    db: {
      ...db,
      [table]: [...tableData, record],
    },
  }
}

const handleUpdateRow = (state: AppState, action: UpdateRowAction) => {
  const { new: newRecord, old: oldRecord, table } = action.payload
  const { db } = state
  const tableData = db[table as keyof DbState]

  if (!tableData) {
    return state
  }

  const newTableData = tableData.map((record) =>
    record.id === oldRecord.id ? newRecord : record
  )

  return {
    ...state,
    db: {
      ...db,
      [table]: newTableData,
    },
  }
}

const handleDeleteRow = (state: AppState, action: DeleteRowAction) => {
  const { old: oldRecord, table } = action.payload
  const { db } = state
  const tableData = db[table as keyof DbState]

  if (!tableData) {
    return state
  }

  const newTableData = tableData.filter((record) => record.id !== oldRecord.id)

  return {
    ...state,
    db: {
      ...db,
      [table]: newTableData,
    },
  }
}
