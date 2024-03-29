import { UNAUTH_USER, AUTH_USER, AUTH_ERROR } from '../actions/types';

export default function(state = {
  authenticated: false,
  error: ''
}, action){
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, error: '' }
    case UNAUTH_USER:
      return { ...state, authenticated: false}
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
