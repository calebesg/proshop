import { productType } from '../constants/productConstants'

interface ActionType {
  type: string
  payload: any
}

interface IProduct {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}

export interface ProductState {
  loading: boolean
  products: IProduct[]
  error: string
}

const initialState = {
  loading: false,
  products: [],
  error: '',
} as ProductState

export function productListReducer(
  state = initialState,
  action: ActionType
): ProductState {
  switch (action.type) {
    case productType.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case productType.PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload }
    case productType.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
