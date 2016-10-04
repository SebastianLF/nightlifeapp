import {
   REQUEST_SEARCH_LIST,
   RESET_SEARCH_LIST,
   SET_SEARCH_LIST_SUCCESS,
   SET_SEARCH_LIST_ERROR,
   GET_INITIAL_SELECTED_BAR,
   PROCESSING_SELECT_BAR,
   SET_SELECTED_BAR
} from '../actions/types';

export default function bars(state = {
  selectedBar: {},
  isFetching: false,
  items: {},
  searchTerm: '',
  error: {
    status: false,
    message: ''
  }
}, action) {
  switch (action.type) {

    case REQUEST_SEARCH_LIST:
      return Object.assign({}, state, { searchTerm: action.payload, isFetching: true });
    case RESET_SEARCH_LIST:
      return Object.assign({}, state, { items: [] });
    case SET_SEARCH_LIST_SUCCESS:
      return Object.assign({}, state, { items: action.payload, isFetching: false, error: { status: false } });
    case SET_SEARCH_LIST_ERROR:
      return Object.assign({}, state, { isFetching: false, error: { status: true, message: action.payload.message } });
    case GET_INITIAL_SELECTED_BAR:
    case SET_SELECTED_BAR:
      return Object.assign({}, state, { selectedBar: action.payload });
    default:
      return state;
  }
}
