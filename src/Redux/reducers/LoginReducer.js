import { LOGIN } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
  token: '',
};

function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    console.log(action);
    return {
      ...state,
      email: action.payload.email,
      nome: action.payload.nome,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default LoginReducer;
