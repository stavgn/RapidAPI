import { replace } from 'react-router-redux';
import { saveDragCoordinates, loginUserAndGetDragCoordinates } from '../api';
import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_DRAG_VALUE
} from '../constants';

export function loginUser(username, thumbnail) {
  return {
    type: LOGIN_USER_SUCCESS,
    username,
    thumbnail
  }
}
const baseUrl = process.env.PUBLIC_URL;

export function attemptLogin(username, password) {
  return dispatch => {
    return loginUserAndGetDragCoordinates(username, password)
          .then((response) => {
            const { username, thumbnail} = response;
            return dispatch(loginUser(username, thumbnail || {}));
          }).then(() => {
            dispatch(replace(baseUrl + '/board'));
          });
  };
}

export function logOutUser() {
  return {
    type: LOGOUT_USER
  };
}

export function logOutAndRedirect() {
  return dispatch => {
    dispatch(logOutUser());
    dispatch(replace(baseUrl + '/'));
  };
}

export function updateStoreWithDragValue(top, left){
  return {
    type: UPDATE_DRAG_VALUE,
    thumbnail: { top, left }
  }
}

export function saveDragValue(top, left) {
  return (dispatch, getState) => {
    const {user: { username } } = getState();
    saveDragCoordinates(username, top, left) // api call mock
    dispatch(updateStoreWithDragValue(top, left));
  }
}
