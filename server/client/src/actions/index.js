import axios from "axios";
import * as actionTypes from "./types";

export const fetchUser = () => async dispatch => { // Getting dispatch, since I am returning a function from action creator
  const res = await axios.get("/api/current_user");
  dispatch({
    type: actionTypes.FETCH_USER,
    payload: res.data
  });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  // Important, why this is fetch_user action:
  // above request gives me a user model back, so with FETCH_USER I can update header data with already updated credits
  dispatch({
    type: actionTypes.FETCH_USER,
    payload: res.data
  });
};