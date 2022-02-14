import fetchTokenAPI from '../../services';

export const LOGIN = 'LOGIN';

export function login(payload) {
  return { type: LOGIN, payload };
}

function dispatchThunk() {
  return async (dispatch) => {
    try {
      dispatch(fetchTokenAPI());
    } catch (error) {
      dispatch({ error });
    }
  };
}

export default dispatchThunk;
