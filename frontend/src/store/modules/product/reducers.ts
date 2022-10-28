import { ActionType, IProductListState } from './types'

import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
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
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from './constants'

const listState: IProductListState = {
  loading: false,
  products: [],
  error: '',
}

const detailState = {
  loading: false,
  product: {
    reviews: [],
  },
  error: '',
}

const actionState = {
  loading: false,
  success: false,
  error: '',
}

export const productList = (state = listState, action: ActionType) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetail = (state = detailState, action: ActionType) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDelete = (state = actionState, action: ActionType) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreate = (state = detailState, action: ActionType) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return { ...detailState }
    default:
      return state
  }
}

export const productUpdate = (state = detailState, action: ActionType) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { ...detailState }
    default:
      return state
  }
}

export const productCreateReview = (
  state = actionState,
  action: ActionType
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return { ...actionState }
    default:
      return state
  }
}
