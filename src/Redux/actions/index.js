import fetchTokenAPI from '../../services';

export const PLAYER = 'PLAYER_LOGIN';
export const PLAYER_GAME = 'PLAYER_GAME';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const GET_QUESTIONS = 'GET_QUESTIONS';

const player = (payload) => ({ type: PLAYER, payload });

export const playerGame = (payload) => ({ type: PLAYER_GAME, payload });

const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const tokenThunk = () => async (dispatch) => {
  try {
    const tokenString = await fetchTokenAPI();
    console.log(tokenString);
    localStorage.setItem('token', JSON.stringify(tokenString));
    dispatch(getToken(tokenString));
  } catch (error) {
    console.log(error);
  }
};

export default player;
