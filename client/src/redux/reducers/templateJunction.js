import {
  ADD_FIELDMAP,
  UPDATE_FIELDMAP,
  REMOVE_FIELDMAP,
  REMOVE_TEMPLATE_FIELDMAP,
} from "../constants";
import produce from "immer";

const initialState = [];

export const junctionReducer = produce((draft, action) => {
  switch (action.type) {
    case UPDATE_FIELDMAP:
      const updateField = draft.map((v) => {
        if (v._id === action.payload._id) {
          return action.payload;
        }
        return v;
      });
      draft = [...updateField];
      return draft;
    case ADD_FIELDMAP:
      draft = [...action.payload];
      return draft;
    case REMOVE_FIELDMAP:
      const removeField = draft.filter((t) => {
        return t._id !== action.payload._id;
      });
      draft = [...removeField];
      return draft;
    case REMOVE_TEMPLATE_FIELDMAP:
      const removeFieldMaps = draft.filter((t) => {
        return t.template !== action.payload;
      });
      draft = [...removeFieldMaps];
      return draft;
    default:
      return draft;
  }
}, initialState);
