export interface IProduct {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}

export interface ActionType {
  type: string
  payload?: any
}

export interface ProductState {
  loading: boolean
  products: IProduct[]
  error: string
}
