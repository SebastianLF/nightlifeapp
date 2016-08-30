import {
   REQUEST_SEARCH_LIST,
   SET_SEARCH_LIST_SUCCESS,
   SET_SEARCH_LIST_ERROR
 } from '../actions';
import { SET_SELECTED_BAR,
 PROCESSING_SELECT_BAR } from '../actions/bars';

export default function bars(state = {
  selectedItem: {
    id: 'moi-j-m-en-fous-je-triche-lyon',
    isProcessing: false
  },
  isFetching: false,
  items: {
    result: {},
    region: {},
    businesses: []
  },
  error: {
    status: false,
    message: ''
  }
}, action) {
  switch (action.type) {
    case SET_SELECTED_BAR:
      return Object.assign({}, state, { selectedItem: { isProcessing: false } }, action.bar);
    case PROCESSING_SELECT_BAR:
      return Object.assign({}, state, { selectedItem: { isProcessing: true } });
    case REQUEST_SEARCH_LIST:
      return Object.assign({}, state, { isFetching: true });
    case SET_SEARCH_LIST_SUCCESS:
      return Object.assign({}, state, { items: action.payload, isFetching: false, error: { status: false } });
    case SET_SEARCH_LIST_ERROR:
      return Object.assign({}, state, { isFetching: false, error: { status: true, message: action.payload.message } });
    default:
      return state;
  }
}
