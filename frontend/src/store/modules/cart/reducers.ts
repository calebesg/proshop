import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './constants'
import { ActionType, ICartState } from './types'

const initialState: ICartState = {
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
        cartItems: state.cartItems.map(itemCart =>
          itemCart.product === existItem.product ? item : itemCart
        ),
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product !== action.payload
        ),
      }
    default:
      return state
  }
}
