import jwt_decode from "jwt-decode";
import axios from "axios";
import { AUTH_USER, LOGOUT_USER } from "../constants";
import moment from "moment";

const addUser = (payload) => {
  return {
    type: AUTH_USER,
    payload,
  };
};

const removeUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const handleLogin = (user) => {
  return async (dispatch) => {
    return dispatch(addUser(user));
  };
};

export const handleLogout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(removeUser());
  history.push("/login");
};

export const setLoggedInUser = (token, history) => {
  return (dispatch) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const decoded = jwt_decode(token);
    const now = new moment();
    const jwtDate = new moment.unix(decoded.exp);
    if (moment.duration(jwtDate.diff(now)).as("hours") > 1)
      dispatch(addUser(decoded));
    else history.push("/login");
  };
};
