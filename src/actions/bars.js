// import axios from 'axios';

export const PROCESSING_SELECT_BAR = 'PROCESSING_SELECT_BAR';
export const SET_SELECTED_BAR = 'SET_SELECTED_BAR';

// set loader state before selectOuting.
export function processingSelectBar() {
  return {
    type: PROCESSING_SELECT_BAR
  };
}

export function selectBar() {
  return function (dispatch) {
    dispatch(processingSelectBar());
  };
}
