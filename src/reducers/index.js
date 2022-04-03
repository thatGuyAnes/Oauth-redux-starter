import {combineReducers} from 'redux';

import authStateReducer from './auth';

export default combineReducers({
  auth: authStateReducer
});
