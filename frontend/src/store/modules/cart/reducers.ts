import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from './constants'
import { ActionType, ICartState } from './types'

const initialState: ICartState = {
  cartItems: [],
  shippingAddress: {
    city: '',
    country: '',
    postalCode: '',
    address: '',
  },
  paymentMethod: '',
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

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}
