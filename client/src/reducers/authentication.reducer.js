import { userConstants } from '../constants';

let auth_token = localStorage.getItem('auth_token');

const initialState = auth_token 
    ? { 
        loggedIn: true,
        auth_token,
    }
    : {
      loggedIn: false,
    };

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        auth_token: action.user.token,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        auth_token: action.user.token,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.REGISTER_REQUEST:
      return {
        loggedIn: true,
        auth_token: action.user.token,
      }
    case userConstants.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        auth_token: action.user.token,
      };
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}