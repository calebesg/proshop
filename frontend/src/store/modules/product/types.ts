interface Review {
  _id: string
  name: string
  rating: number
  createdAt: string
  comment: string
}

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
  reviews: Review[]
}

export interface ActionType {
  type: string
  payload?: any
}

export interface IProductListState {
  loading: boolean
  products: IProduct[]
  page: number
  totalPage: number
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
