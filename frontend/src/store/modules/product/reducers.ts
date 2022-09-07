import { ActionType, IProductListState } from './types'

import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
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
