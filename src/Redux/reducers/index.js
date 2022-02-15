import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import TokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  LoginReducer,
  TokenReducer,
});

export default rootReducer;
