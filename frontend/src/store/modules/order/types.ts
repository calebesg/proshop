import { IItemCart } from '../cart/types'

export interface ActionType {
  type: string
  payload?: any
}

export interface OrderDetail {
  loading: boolean
  orderItems: IItemCart[]
  shippingAddress: any | null
  error: string
}

export interface IOrder {
  loading: boolean
  order: {
    user: string
    orderItems: IItemCart[]
    _id: string
  } | null
  error: string
}
