import { ActionCreator, Action, Dispatch } from 'redux'
import api from '../libs/api'
import { productType } from '../constants/productConstants'

interface IState {
  type: string
  payload?: any
}

export const listProducts: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<IState>): Promise<Action> => {
    try {
      dispatch({ type: productType.PRODUCT_LIST_REQUEST })

      const { data } = await api.get('/api/products')

      return dispatch({
        type: productType.PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      return dispatch({
        type: productType.PRODUCT_LIST_FAIL,
        payload: error,
      })
    }
  }
}

/*
export const listProducts = () => async (dispatch: any) => {
  try {
    dispatch({ type: productType.PRODUCT_LIST_REQUEST })

    const { data } = await api.get('/api/products')

    dispatch({
      type: productType.PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: productType.PRODUCT_LIST_FAIL,
      payload: error,
    })
  }
}
*/
