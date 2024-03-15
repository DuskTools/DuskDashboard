import { Dispatch } from 'react'

import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js'

import { AppState } from '~types'

export enum ActionType {
  INCREMENT_LOADING = 'INCREMENT_LOADING',
  DECREMENT_LOADING = 'DECREMENT_LOADING',
  CLEAR_USER = 'CLEAR_USER',
  SET_AUTH_LOADED = 'SET_AUTH_LOADED',
  SET_LOGIN_PAYLOAD = 'SET_LOGIN_PAYLOAD',
  UPDATE_ROW = 'UPDATE_ROW',
  ADD_ROW = 'ADD_ROW',
  DELETE_ROW = 'DELETE_ROW',
}

export type IncrementLoadingAction =
  ActionInterface<ActionType.INCREMENT_LOADING>
export type DecrementLoadingAction =
  ActionInterface<ActionType.DECREMENT_LOADING>
export type SetAuthLoadedAction = ActionInterface<ActionType.SET_AUTH_LOADED>
export type SetLoginPayloadAction = ActionInterface<
  ActionType.SET_LOGIN_PAYLOAD,
  Pick<AppState, 'db' | 'currentUser'>
>
export type UpdateRowAction = ActionInterface<
  ActionType.UPDATE_ROW,
  RealtimePostgresUpdatePayload<{ [key: string]: unknown }>
>

export type AddRowAction = ActionInterface<
  ActionType.ADD_ROW,
  RealtimePostgresInsertPayload<{ [key: string]: unknown }>
>

export type DeleteRowAction = ActionInterface<
  ActionType.DELETE_ROW,
  RealtimePostgresDeletePayload<{ [key: string]: unknown }>
>

export type ClearUserAction = ActionInterface<ActionType.CLEAR_USER>

export type ReducerAction =
  | IncrementLoadingAction
  | DecrementLoadingAction
  | ClearUserAction
  | SetAuthLoadedAction
  | SetLoginPayloadAction
  | UpdateRowAction
  | AddRowAction
  | DeleteRowAction

export default {
  decrementLoading: actionCreator(ActionType.DECREMENT_LOADING),
  incrementLoading: actionCreator(ActionType.INCREMENT_LOADING),
  setAuthLoaded: actionCreator(ActionType.SET_AUTH_LOADED),
  setLoginPayload: actionCreator(ActionType.SET_LOGIN_PAYLOAD),
  clearUser: actionCreator(ActionType.CLEAR_USER),
  updateRow: actionCreator(ActionType.UPDATE_ROW),
  addRow: actionCreator(ActionType.ADD_ROW),
  deleteRow: actionCreator(ActionType.DELETE_ROW),
}

// Da Pipes

type ActionInterface<T extends string, P = void> = {
  type: T
  payload: P
}

export type AppDispatch = Dispatch<ReducerAction>

type PayloadForType<T extends ReducerAction['type']> = Extract<
  ReducerAction,
  { type: T }
>['payload']

type SimpleAction = Extract<ReducerAction, { payload: void }>

function actionCreator<A extends SimpleAction>(
  type: A['type']
): (dispatch: AppDispatch) => void
function actionCreator<
  A extends Exclude<ReducerAction, SimpleAction>,
  T extends A['type'],
>(type: T): (dispatch: AppDispatch, payload: PayloadForType<T>) => void
function actionCreator<A extends ReducerAction, T extends A['type']>(
  type: T
): (dispatch: AppDispatch, payload?: PayloadForType<T>) => void {
  return (dispatch, payload) =>
    dispatch({
      type,
      payload,
    } as A)
}
