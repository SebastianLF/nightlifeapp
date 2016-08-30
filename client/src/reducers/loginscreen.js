import { SHOW_LOGINSCREEN, CLOSE_LOGINSCREEN } from '../actions';

export default function loginscreen(state = { active: false }, action) {
  switch (action.type) {
    case SHOW_LOGINSCREEN:
      return Object.assign({}, state, { active: true });
    case CLOSE_LOGINSCREEN:
      return Object.assign({}, state, { active: false });
    default:
      return state;
  }
}
