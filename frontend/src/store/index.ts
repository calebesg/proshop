import store from './store'
export default store

export type { IStoreStates } from './store'

export type {
  IProductListState,
  IProductDetailState,
  IProduct,
} from './modules/product/types'

export { listProducts, productDetail } from './modules/product/actions'
export {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
} from './modules/cart/actions'
export { login, logout, register, getUserDetail } from './modules/user/actions'
export { createOrder, getOrderDetails } from './modules/order/actions'
