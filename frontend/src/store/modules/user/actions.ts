import { ActionCreator, Dispatch } from 'redux'

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from './constants'
import { ActionType } from './types'
import api from '../../../libs/api'

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
