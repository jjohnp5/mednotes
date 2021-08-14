import {
  ADD_FIELD,
  UPDATE_FIELD,
  REMOVE_FIELD,
  REMOVE_TEMPLATE_FIELD,
} from "../constants";
import produce from "immer";

const initialState = [];

export const fieldReducer = produce((draft, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      const updateField = draft.map((v) => {
        if (v._id === action.payload.id) {
          return action.payload;
        }
        return v;
      });
      draft = [...updateField];
      return draft;
    case ADD_FIELD:
      draft = [...action.payload];
      return draft;
    case REMOVE_FIELD:
      const removeField = draft.filter((t) => {
        return t._id !== action.payload.id;
      });
      draft = [...removeField];
      return draft;
    case REMOVE_TEMPLATE_FIELD:
      const removeTemplateFields = draft.filter((t) => {
        return t.template !== action.payload;
      });
      draft = [...removeTemplateFields];
      return draft;
    default:
      return draft;
  }
}, initialState);
