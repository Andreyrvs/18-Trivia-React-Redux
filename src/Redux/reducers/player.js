import { PLAYER, PLAYER_GAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case PLAYER:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
    };
  case PLAYER_GAME:
    return {
      ...state,
      assertions: payload.assertions,
      score: payload.score,
    };
  default:
    return state;
  }
}

export default player;
