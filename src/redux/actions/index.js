import fetchTokenAPI from '../../services';

export const PLAYER = 'PLAYER';
export const GET_TOKEN = 'GET_TOKEN';
export const PLAYER_SCORE = ' PLAYER_SCORE';

export function player(payload) {
  return { type: PLAYER, payload };
}

export function getToken(payload) {
  return { type: GET_TOKEN, payload };
}

export function playerScore(payload) {
  return { type: PLAYER_SCORE, payload };
}

export function tokenThunk() {
  return async (dispatch) => {
    try {
      const tokenString = await fetchTokenAPI();
      // localStorage.setItem('token', tokenString);
      dispatch(getToken(tokenString));
    } catch (error) {
      console.log(error);
    }
  };
}

export default tokenThunk;
