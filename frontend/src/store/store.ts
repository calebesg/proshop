import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { IProductDetailState, IProductListState } from './'
import { productList, productDetail } from './modules/product/reducers'
import { cartReducer } from './modules/cart/reducers'

const reducers = combineReducers({
  productList: productList,
  productDetail: productDetail,
  cart: cartReducer,
})

const savedCartItems = localStorage.getItem('@proshop:cart')
  ? JSON.parse(localStorage.getItem('@proshop:cart') as string)
  : []

const initialState = {
  cart: { cartItems: savedCartItems },
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
}

export default store
