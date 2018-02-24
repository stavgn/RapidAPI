import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from '../constants';
import initialState from './initialState';

export function user(state = initialState.user, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
    const { username } = action;
      return { username };
    case LOGOUT_USER:
        return {};
    default:
      return state;
  }
}

export function isUserLoggedIn(user) {
  return typeof user.username === 'string'
}
