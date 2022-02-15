import fetchTokenAPI from '../../services';

export const PLAYER = 'PLAYER';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export function player(payload) {
  return { type: PLAYER, payload };
}

const getToken = (payload) => ({ type: GET_TOKEN, payload });

export function tokenThunk() {
  return async (dispatch) => {
    try {
      const tokenString = await fetchTokenAPI();

      localStorage.setItem('token', tokenString);
      dispatch(getToken(tokenString));
    } catch (error) {
      console.log(error);
    }
  };
}

export default player;
