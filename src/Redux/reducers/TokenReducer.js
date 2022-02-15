import { GET_TOKEN, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  token: '',
  error: '',
};

function TokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    // console.log(action);
    return {
      ...state,
      token: action.payload,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload.error,
    };
  default:
    return state;
  }
}

export default TokenReducer;
