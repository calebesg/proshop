import { ActionCreator, Dispatch } from 'redux'

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
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
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from './constants'
import { ORDER_LIST_RESET } from '../order/constants'
import { ActionType } from './types'
import api from '../../../libs/api'

interface UserProfile {
  id: string
  name: string
  email: string
  password: string
}

export const login: ActionCreator<any> = (email: string, password: string) => {
  return async (dispatch: Dispatch<ActionType>) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await api.post(
        '/api/users/login',
        { email, password },
        config
      )

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('@proshop:logged', JSON.stringify(data))
    } catch (error: any) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const logout: ActionCreator<any> = () => {
  return (dispatch: Dispatch<ActionType>) => {
    localStorage.removeItem('@proshop:logged')
    dispatch({
      type: USER_LOGOUT,
    })

    dispatch({
      type: USER_DETAILS_RESET,
    })

    dispatch({
      type: ORDER_LIST_RESET,
    })

    dispatch({
      type: USER_LIST_RESET,
    })
  }
}

export const register: ActionCreator<any> = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch<ActionType>) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await api.post(
        '/api/users',
        { name, email, password },
        config
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('@proshop:logged', JSON.stringify(data))
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const getUserDetail: ActionCreator<any> = (id: string) => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST })

      const userInfo = getState().userLogin.userInfo

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await api.get(`/api/users/${id}`, config)

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const updateUserProfile: ActionCreator<any> = (user: UserProfile) => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

      const userInfo = getState().userLogin.userInfo

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await api.put(`/api/users/profile`, user, config)

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const listUsers: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({ type: USER_LIST_REQUEST })

      const userInfo = getState().userLogin.userInfo

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await api.get('/api/users', config)

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const deleteUser: ActionCreator<any> = id => {
  return async (dispatch: Dispatch<ActionType>, getState: any) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST })

      const userInfo = getState().userLogin.userInfo

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await api.delete(`/api/users/${id}`, config)

      dispatch({
        type: USER_DELETE_SUCCESS,
      })
    } catch (error: any) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
