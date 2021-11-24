import { IAuthState } from "./state";
import { AuthActions, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER } from "./actions";


const initialState: IAuthState = {
  isAuthenticated: null,
  token: null
}

export function authReducer(state: IAuthState = initialState, action: AuthActions): IAuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        token: action.token
      }

    case LOGIN_FAIL:
      return {
        isAuthenticated: false,
        token: null,
      }

    case LOGOUT:
      return {
        isAuthenticated: false,
        token: null,
      }

    case REGISTER:
      return {
        isAuthenticated: false,
        token: null,
      }
  }
  return state
}