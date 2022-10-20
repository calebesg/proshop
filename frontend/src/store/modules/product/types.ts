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

export interface IProductListState {
  loading: boolean
  products: IProduct[]
  error: string
}

export interface IProductActionState {
  loading: boolean
  success: boolean
  error: string
}

export interface IProductDetailState {
  loading: boolean
  product: IProduct
  error: string
}
