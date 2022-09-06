import { ActionCreator, Action, Dispatch } from 'redux'
import api from '../../../libs/api'

import { ActionType } from './types'

import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from './constants'

export const listProducts: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<ActionType>): Promise<Action> => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await api.get('/api/products')

      return dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      return dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error,
      })
    }
  }
}
