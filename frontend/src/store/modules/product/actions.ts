import { ActionCreator, Action, Dispatch } from 'redux'
import api from '../../../libs/api'

import { ActionType } from './types'

import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from './constants'

export const listProducts: ActionCreator<any> = (keyword = '', page = 1) => {
  return async (dispatch: Dispatch<ActionType>): Promise<Action> => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await api.get(
        `/api/products?keyword=${keyword}&page=${page}`
      )

      console.log(data)

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

export const createProduct: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await api.post(`/api/products`, {}, config)

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const updateProduct: ActionCreator<any> = product => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
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
        `/api/products/${product._id}`,
        product,
        config
      )

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const createProductReview: ActionCreator<any> = (productId, review) => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
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

      await api.post(`/api/products/${productId}/review`, review, config)

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error: any) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const listTopProducts: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<ActionType>): Promise<Action> => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST })

      const { data } = await api.get(`/api/products/top`)

      return dispatch({
        type: PRODUCT_TOP_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      return dispatch({
        type: PRODUCT_TOP_FAIL,
        payload: error.message,
      })
    }
  }
}
