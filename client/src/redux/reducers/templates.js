import { ADD_TEMPLATE, UPDATE_TEMPLATE, REMOVE_TEMPLATE } from "../constants";
import produce from "immer";

const initialState = [];

export const templateReducer = produce((draft, action) => {
  switch (action.type) {
    case UPDATE_TEMPLATE:
      const updateTemplate = draft.map((t) => {
        if (t._id === action.payload._id) {
          return { ...t, ...action.payload };
        }
        return t;
      });
      draft = [...updateTemplate];
      return draft;
    case ADD_TEMPLATE:
      draft = [...action.payload];
      return draft;
    case REMOVE_TEMPLATE:
      const removeTemplate = draft.filter((t) => {
        return t._id !== action.payload._id;
      });
      draft = [...removeTemplate];
      return draft;
    default:
      return draft;
  }
}, initialState);
