import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { IProductDetailState, IProductListState } from './'
import {
  productList,
  productDetail,
  productDelete,
} from './modules/product/reducers'
import { cartReducer } from './modules/cart/reducers'
import { ICartState } from './modules/cart/types'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  deleteUserReducer,
  userUpdateReducer,
} from './modules/user/reducers'
import {
  orderCreate,
  orderDetail,
  orderPay,
  orderList,
} from './modules/order/reducers'
import { IDeleteUserState, IUserList, IUserState } from './modules/user/types'
import { IOrder, IOrderList, IOrderPay } from './modules/order/types'
import { IProductActionState } from './modules/product/types'

const reducers = combineReducers({
  productList: productList,
  productDetail: productDetail,
  productDelete: productDelete,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  deleteUser: deleteUserReducer,
  orderCreate: orderCreate,
  orderDetails: orderDetail,
  orderPay: orderPay,
  userOrders: orderList,
  listUsers: userListReducer,
})

const savedCartItems = localStorage.getItem('@proshop:cart')
  ? JSON.parse(localStorage.getItem('@proshop:cart') as string)
  : []

const savedUser = localStorage.getItem('@proshop:logged')
  ? JSON.parse(localStorage.getItem('@proshop:logged') as string)
  : null

const savedShippingAddress = localStorage.getItem('@proshop:shippingAddress')
  ? JSON.parse(localStorage.getItem('@proshop:shippingAddress') as string)
  : { address: '', city: '', country: '', postalCode: '' }

const savedPaymentMethod = localStorage.getItem('@proshop:paymentMethod')
  ? JSON.parse(localStorage.getItem('@proshop:paymentMethod') as string)
  : ''

const initialState = {
  cart: {
    cartItems: savedCartItems,
    shippingAddress: savedShippingAddress,
    paymentMethod: savedPaymentMethod,
  },
  userLogin: {
    loading: false,
    userInfo: savedUser,
    error: '',
  },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export interface IStoreStates {
  productList: IProductListState
  productDetail: IProductDetailState
  productDelete: IProductActionState
  cart: ICartState
  userLogin: IUserState
  userRegister: IUserState
  userDetails: IUserState
  userUpdateProfile: IUserState
  userUpdate: IUserState
  userOrders: IOrderList
  orderCreate: IOrder
  orderDetails: IOrder
  orderPay: IOrderPay
  listUsers: IUserList
  deleteUser: IDeleteUserState
}

export default store
