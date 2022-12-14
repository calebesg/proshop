import { ActionType, IOrder, IOrderList, IOrderPay } from './types'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
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

const ordersState: IOrderList = {
  loading: false,
  orders: [],
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

export const orderDeliver = (state = payState, action: ActionType) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { ...state, loading: true }
    case ORDER_DELIVER_SUCCESS:
      return { ...state, loading: false, success: true }
    case ORDER_DELIVER_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ORDER_DELIVER_RESET:
      return { ...payState }
    default:
      return state
  }
}

export const orderList = (state = ordersState, action: ActionType) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true }
    case ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ORDER_LIST_RESET:
      return { ...ordersState }
    default:
      return state
  }
}

export const orderListAdmin = (state = ordersState, action: ActionType) => {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return { ...state, loading: true }
    case ORDER_LIST_ADMIN_SUCCESS:
      return { ...state, loading: false, orders: action.payload }
    case ORDER_LIST_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
