import { Dispatch, ActionCreator } from 'redux'

import api from '../../../libs/api'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from './constants'
import { ActionType } from './types'

export const addToCart: ActionCreator<any> = (id: string, qty: number) => {
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

export const removeFromCart: ActionCreator<any> = (id: string) => {
  return (dispatch: Dispatch<ActionType>, getState: any) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })

    localStorage.setItem(
      '@proshop:cart',
      JSON.stringify(getState().cart.cartItems)
    )
  }
}

export const saveShippingAddress: ActionCreator<any> = data => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })

    localStorage.setItem('@proshop:shippingAddress', JSON.stringify(data))
  }
}
