import { ActionType, IOrder, IOrderPay } from './types'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from './constants'

const initialState: IOrder = {
  loading: false,
  order: null,
  error: '',
}

const payState: IOrderPay = {
  loading: false,
  success: false,
  error: '',
}

export const orderCreate = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true }
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDetail = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true, error: '' }
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: '' }
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPay = (state = payState, action: ActionType) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loading: true }
    case ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return { ...payState }
    default:
      return state
  }
}
