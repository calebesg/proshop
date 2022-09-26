import { IProduct } from '../product/types'

export interface ActionType {
  type: string
  payload?: any
}

export interface IItemCart {
  product: string
  name: string
  image: string
  countInStock: number
  qty: number
  price: number
}

interface IShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

export interface ICartState {
  cartItems: IItemCart[]
  shippingAddress: IShippingAddress
  paymentMethod: string
}
