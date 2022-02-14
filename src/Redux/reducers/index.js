import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';

// import primeiroReducer from './primeiroReducer';
// import segundoReducer from './segundoReducer';
const rootReducer = combineReducers({
  LoginReducer,
  // segundoReducer,
});

export default rootReducer;
