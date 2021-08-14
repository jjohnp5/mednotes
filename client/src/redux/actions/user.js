import jwt_decode from "jwt-decode";
import axios from "axios";
import { AUTH_USER, LOGOUT_USER } from "../constants";

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

export const handleLogout = () => (dispatch) => dispatch(removeUser());

export const setLoggedInUser = (token) => {
  return (dispatch) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const decoded = jwt_decode(token);
    dispatch(addUser(decoded));
  };
};
