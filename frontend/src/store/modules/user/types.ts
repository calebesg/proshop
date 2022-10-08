export interface ActionType {
  type: string
  payload?: any
}

export interface ActionType {
  type: string
  payload?: any
}

interface IUser {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  token: string
}

export interface IUserState {
  loading: boolean
  userInfo: IUser | null
  error: string
}

export interface IDeleteUserState {
  loading: boolean
  success: null | boolean
  error: string
}

export interface IUserList {
  loading: boolean
  users: IUser[]
  error: string
}
