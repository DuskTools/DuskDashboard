import { Dispatch } from 'react'

import { AuthState } from '~types'

export enum ActionType {
  SET_SESSION = 'SET_SESSION',
  INCREMENT_LOADING = 'INCREMENT_LOADING',
  DECREMENT_LOADING = 'DECREMENT_LOADING',
}
const decrementLoading = actionCreator(ActionType.DECREMENT_LOADING)
const incrementLoading = actionCreator(ActionType.INCREMENT_LOADING)
const setSession = actionCreator(ActionType.SET_SESSION)

type IncrementLoadingAction = ActionInterface<ActionType.INCREMENT_LOADING>
type DecrementLoadingAction = ActionInterface<ActionType.DECREMENT_LOADING>
type SetSessionAction = ActionInterface<
  ActionType.SET_SESSION,
  AuthState['session']
>

export type ReducerAction =
  | IncrementLoadingAction
  | DecrementLoadingAction
  | SetSessionAction

export default {
  decrementLoading,
  incrementLoading,
  setSession,
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
