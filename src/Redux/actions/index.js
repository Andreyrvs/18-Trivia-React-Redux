import fetchAPI from '../../services';

export const LOGIN = 'LOGIN';

function login(data) {
  return { type: LOGIN, payload: data };
}

function loginThunk() {
  return async (dispatch) => {
    try {
      const API = fetchAPI();
      /* ===> requisição da API */
      /* ===> despacha action com os dados do personagem */
    } catch (error) {

      /* ===> despacha action com o erro */

    }
  };
}

export default loginThunk;
