import { Dispatch } from 'react'

import { AppState } from '~types'

export enum ActionType {
  INCREMENT_LOADING = 'INCREMENT_LOADING',
  DECREMENT_LOADING = 'DECREMENT_LOADING',
  CLEAR_USER = 'CLEAR_USER',
  SET_AUTH_LOADED = 'SET_AUTH_LOADED',
  SET_LOGIN_PAYLOAD = 'SET_LOGIN_PAYLOAD',
}

type IncrementLoadingAction = ActionInterface<ActionType.INCREMENT_LOADING>
type DecrementLoadingAction = ActionInterface<ActionType.DECREMENT_LOADING>
type SetAuthLoadedAction = ActionInterface<ActionType.SET_AUTH_LOADED>
type SetLoginPayloadAction = ActionInterface<
  ActionType.SET_LOGIN_PAYLOAD,
  Pick<AppState, 'db' | 'currentUser'>
>

type ClearUserAction = ActionInterface<ActionType.CLEAR_USER>

export type ReducerAction =
  | IncrementLoadingAction
  | DecrementLoadingAction
  | ClearUserAction
  | SetAuthLoadedAction
  | SetLoginPayloadAction

export default {
  decrementLoading: actionCreator(ActionType.DECREMENT_LOADING),
  incrementLoading: actionCreator(ActionType.INCREMENT_LOADING),
  setAuthLoaded: actionCreator(ActionType.SET_AUTH_LOADED),
  setLoginPayload: actionCreator(ActionType.SET_LOGIN_PAYLOAD),
  clearUserAction: actionCreator(ActionType.CLEAR_USER),
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
