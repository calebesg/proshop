import store from './store'
export default store

export type { IStoreStates } from './store'

export type {
  IProductListState,
  IProductDetailState,
  IProduct,
} from './modules/product/types'

export { listProducts, productDetail } from './modules/product/actions'
export { addToCart } from './modules/cart/actions'
