import fetchTokenAPI from '../../services';

export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export function login(payload) {
  return { type: LOGIN, payload };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export const tokenSuccess = (payload) => ({ type: GET_TOKEN, payload });

export function tokenThunk() {
  return async (dispatch) => {
    try {
      const tokenString = await fetchTokenAPI();
      dispatch(tokenSuccess(tokenString));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export default login;
