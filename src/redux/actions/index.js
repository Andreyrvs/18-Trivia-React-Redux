export const PLAYER = 'PLAYER';

export function player(payload) {
  return { type: PLAYER, payload };
}

function tokenThunk() {
  return async (dispatch) => {
    try {

      /* ===> requisição da API */
      /* ===> despacha action com os dados do personagem */

    } catch (error) {

      /* ===> despacha action com o erro */

    }
  };
}

export default tokenThunk;
