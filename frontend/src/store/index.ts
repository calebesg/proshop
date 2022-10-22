import store from './store'
export default store

export type { IStoreStates } from './store'

export type {
  IProductListState,
  IProductDetailState,
  IProduct,
} from './modules/product/types'

// PRODUCT =====================================
export {
  listProducts,
  productDetail,
  deleteProduct,
  createProduct,
} from './modules/product/actions'

// CART ========================================
export {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
} from './modules/cart/actions'

// USER ========================================
export {
  login,
  logout,
  register,
  getUserDetail,
  updateUserProfile,
  deleteUser,
  listUsers,
  updateUser,
} from './modules/user/actions'

// ORDERS =======================================
export {
  createOrder,
  getOrderDetails,
  orderPay,
  getOrders,
} from './modules/order/actions'
