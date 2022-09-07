import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './constants'
import { IProduct } from '../product/types'
import { ActionType } from './types'

interface IItemCart {
  product: IProduct
}

interface ICart {
  cartItems: IItemCart[]
}

const initialState: ICart = {
  cartItems: [],
}

export const cartReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find(
        itemCart => itemCart.product === item.product
      )

      if (!existItem) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

      return {
        ...state,
        cartItem: state.cartItems.map(itemCart =>
          itemCart.product === existItem.product ? item : itemCart
        ),
      }
    case CART_REMOVE_ITEM:
      return { ...state }
    default:
      return state
  }
}
