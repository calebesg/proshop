import { IItemCart } from '../cart/types'

export interface ActionType {
  type: string
  payload?: any
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
