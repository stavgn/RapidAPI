// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import { routerReducer } from 'react-router-redux';
 import { user } from './user';
 import { thumbnail } from './thumbnail';

  export default combineReducers({
   user,
   thumbnail,
   routing: routerReducer
 });
