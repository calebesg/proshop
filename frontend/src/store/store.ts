import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { IProductDetailState, IProductListState } from './'
import { productList, productDetail } from './modules/product/reducers'

const reducers = combineReducers({
  productList: productList,
  productDetail: productDetail,
})

const initialState = {}

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
