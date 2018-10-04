import axios from "axios";
import * as actionTypes from "./types";

export const fetchUser = () => async dispatch => { // Getting dispatch, since I am returning a function from action creator
  const res = await axios.get("/api/current_user");
  dispatch({
    type: actionTypes.FETCH_USER,
    payload: res.data
  });
};
