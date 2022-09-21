import { ActionType, IUserState } from './types'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './constants'

const initialState: IUserState = {
  loading: false,
  userInfo: null,
  error: '',
}

export const userLoginReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_LOGOUT:
      return { ...state, loading: false, userInfo: null }
    default:
      return state
  }
}

export const userRegisterReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true }
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true }
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
