import { IItemCart } from '../cart/types'

interface Order {
  user: {
    _id: string
    name: string
    email: string
  }
  orderItems: IItemCart[]
  _id: string
  shippingAddress: {
    address: string
    postalCode: string
    city: string
    country: string
  }
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  paymentMethod: string
  isPaid: boolean
  isDelivered: boolean
  paidAt: string
  deliveredAt: string
  createdAt: string
}

export interface ActionType {
  type: string
  payload?: any
}

export interface IOrderPay {
  loading: boolean
  success: boolean
  error: string
}

export interface IOrderList {
  loading: boolean
  orders: Order[]
  error: string
}

export interface IOrder {
  loading: boolean
  order: Order | null
  error: string
}
