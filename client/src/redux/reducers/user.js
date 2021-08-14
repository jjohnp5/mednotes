import { AUTH_USER, LOGOUT_USER } from "../constants";
import produce from "immer";

const initialState = {};

export const userReducer = produce((draft, action) => {
  switch (action.type) {
    case AUTH_USER:
      draft = { ...draft, ...action.payload };
      return draft;
    case LOGOUT_USER:
      draft = {};
      return draft;
    default:
      return draft;
  }
}, initialState);
