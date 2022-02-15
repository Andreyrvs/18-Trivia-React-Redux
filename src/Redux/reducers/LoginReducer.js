import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    // console.log(action);
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
}

export default LoginReducer;
