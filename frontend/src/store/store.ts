import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { IProductDetailState, IProductListState } from './'
import { productList, productDetail } from './modules/product/reducers'
import { cartReducer } from './modules/cart/reducers'
import { ICartState } from './modules/cart/types'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
} from './modules/user/reducers'
import { IUserState } from './modules/user/types'

const reducers = combineReducers({
  productList: productList,
  productDetail: productDetail,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const savedCartItems = localStorage.getItem('@proshop:cart')
  ? JSON.parse(localStorage.getItem('@proshop:cart') as string)
  : []

const savedUser = localStorage.getItem('@proshop:logged')
  ? JSON.parse(localStorage.getItem('@proshop:logged') as string)
  : null

const initialState = {
  cart: { cartItems: savedCartItems },
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
  cart: ICartState
  userLogin: IUserState
  userRegister: IUserState
  userDetails: IUserState
  userUpdateProfile: IUserState
}

export default store
