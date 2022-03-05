import { PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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

  default:
    return state;
  }
}

export default player;
