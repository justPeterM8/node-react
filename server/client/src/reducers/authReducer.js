import * as actionTypes from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER: {
      return action.payload || false; // empty string is treated like false, but would return empty string, so if false ('') return false
    }
    default: {
      return state;
    }
  }
};
