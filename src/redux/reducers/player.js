import { PLAYER, PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  default:
    return state;
  }
}

export default player;
