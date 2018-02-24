import initialState from './initialState';
import {
	UPDATE_DRAG_VALUE,
	LOGIN_USER_SUCCESS
} from '../constants';

export function thumbnail(state = initialState.thumbnail, action) {
	if (action.type === UPDATE_DRAG_VALUE || action.type === LOGIN_USER_SUCCESS) {
		const {thumbnail: {top, left}} = action;
		return { top, left };
	}
	return state;
}
