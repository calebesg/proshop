import { IProduct } from '../product/types'

export interface ActionType {
  type: string
  payload?: any
}

interface IItemCart {
  product: string
  name: string
  image: string
  countInStock: number
  qty: number
  price: number
}

export interface ICartState {
  cartItems: IItemCart[]
}
