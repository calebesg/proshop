import { ActionType, IDeleteUserState, IUserList, IUserState } from './types'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from './constants'

const initialState: IUserState = {
  loading: false,
  userInfo: null,
  error: '',
}

const listState: IUserList = {
  loading: false,
  users: [],
  error: '',
}

const deleteUserState: IDeleteUserState = {
  loading: false,
  success: null,
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
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_DETAILS_RESET: {
      return { ...initialState }
    }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const userListReducer = (state = listState, action: ActionType) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true }
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { ...listState }
    default:
      return state
  }
}

export const deleteUserReducer = (
  state = deleteUserState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true }
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true }
    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true }
    case USER_UPDATE_SUCCESS:
      return { ...state, userInfo: action.payload }
    case USER_UPDATE_FAIL:
      return { ...state, error: action.payload }
    case USER_UPDATE_RESET:
      return { ...state }
    default:
      return state
  }
}
