import { Dispatch, ActionCreator } from 'redux'

import { ActionType } from './types'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
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

export const getOrderDetails: ActionCreator<any> = id => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await api.get(`/api/orders/${id}`, config)

      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const orderPay: ActionCreator<any> = (orderId, paymentResult) => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
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

      const { data } = await api.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      )

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
