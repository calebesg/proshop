import { productType } from '../constants/productConstants'

type Action = {
  type: string
  payload: any
}

export function productListReducer(state = { products: [] }, action: Action) {
  switch (action.type) {
    case productType.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case productType.PRODUCT_LIST_SUCCESS:
      return { loading: true, products: action.payload }
    case productType.PRODUCT_LIST_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}
