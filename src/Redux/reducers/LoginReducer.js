import { LOGIN } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
  token: '',
};

function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload.algumValor,
      nome: action.payload.algumValor,
    };
  default:
    return state;
  }
}

export default LoginReducer;
