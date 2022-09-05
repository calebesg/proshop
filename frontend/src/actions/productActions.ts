import api from '../libs/api'
import { productType } from '../constants/productConstants'

type Dispatch = (props: { type: string; payload?: any }) => void

export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: productType.PRODUCT_LIST_REQUEST })

    const { data } = await api.get('/api/products')

    dispatch({
      type: productType.PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: productType.PRODUCT_LIST_FAIL,
      payload: error,
    })
  }
}
