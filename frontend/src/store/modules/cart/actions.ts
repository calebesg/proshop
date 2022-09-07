import { Dispatch } from 'redux'

import api from '../../../libs/api'
import { CART_ADD_ITEM } from './constants'
import { ActionType } from './types'

export const addToCart = (id: string, qty: number) => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    const { data } = await api.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    })

    localStorage.setItem(
      '@proshop:cart',
      JSON.stringify(getState().cart.cartItems)
    )
  }
}
