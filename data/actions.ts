import { Dispatch } from 'react'

import { User, UserCampaign } from '~types'

export enum ActionType {
  INCREMENT_LOADING = 'INCREMENT_LOADING',
  DECREMENT_LOADING = 'DECREMENT_LOADING',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_CAMPAIGNS = 'SET_CAMPAIGNS',
  SET_AUTH_LOADED = 'SET_AUTH_LOADED',
}

type IncrementLoadingAction = ActionInterface<ActionType.INCREMENT_LOADING>
type DecrementLoadingAction = ActionInterface<ActionType.DECREMENT_LOADING>
type SetCurrentUserAction = ActionInterface<
  ActionType.SET_CURRENT_USER,
  User['Row'] | null
>
type SetCampaignsAction = ActionInterface<
  ActionType.SET_CAMPAIGNS,
  UserCampaign[]
>
type SetAuthLoadedAction = ActionInterface<ActionType.SET_AUTH_LOADED>

export type ReducerAction =
  | IncrementLoadingAction
  | DecrementLoadingAction
  | SetCurrentUserAction
  | SetCampaignsAction
  | SetAuthLoadedAction

export default {
  decrementLoading: actionCreator(ActionType.DECREMENT_LOADING),
  incrementLoading: actionCreator(ActionType.INCREMENT_LOADING),
  setCurrentUser: actionCreator(ActionType.SET_CURRENT_USER),
  setCampaigns: actionCreator(ActionType.SET_CAMPAIGNS),
  setAuthLoaded: actionCreator(ActionType.SET_AUTH_LOADED),
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
