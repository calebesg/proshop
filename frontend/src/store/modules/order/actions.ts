import { Dispatch, ActionCreator } from 'redux'

import { ActionType } from './types'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from './constants'
import api from '../../../libs/api'

export const createOrder: ActionCreator<any> = order => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await api.post('/api/orders', order, config)

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
