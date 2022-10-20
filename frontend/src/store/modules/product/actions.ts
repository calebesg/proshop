import { ActionCreator, Action, Dispatch } from 'redux'
import api from '../../../libs/api'

import { ActionType } from './types'

import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
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
    } catch (error: any) {
      return dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.message,
      })
    }
  }
}

export const productDetail: ActionCreator<any> = (id: string) => {
  return async (dispatch: Dispatch<ActionType>): Promise<Action> => {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST })

      const { data } = await api.get(`/api/products/${id}`)

      return dispatch({
        type: PRODUCT_DETAIL_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      return dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload: error.message,
      })
    }
  }
}

export const deleteProduct: ActionCreator<any> = productId => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await api.delete(`/api/products/${productId}`, config)

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      })
    } catch (error: any) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
