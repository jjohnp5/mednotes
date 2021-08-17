import {
  ADD_VISIT,
  UPDATE_VISIT,
  REMOVE_VISIT,
  REMOVE_PATIENT_VISITS,
} from "../constants";
import produce from "immer";

const initialState = [];

export const visitReducer = produce((draft, action) => {
  switch (action.type) {
    case UPDATE_VISIT:
      const updateVisit = draft.map((v) => {
        if (v._id === action.payload._id) {
          return action.payload;
        }
        return v;
      });
      draft = [...updateVisit];
      return draft;
    case ADD_VISIT:
      draft = [...action.payload];
      return draft;
    case REMOVE_VISIT:
      const removeVisit = draft.filter((t) => {
        return t._id !== action.payload._id;
      });
      draft = [...removeVisit];
      return draft;
    case REMOVE_PATIENT_VISITS:
      const removePatientVisits = draft.filter((t) => {
        return t.patient !== action.payload;
      });
      draft = [...removePatientVisits];
      return draft;
    default:
      return draft;
  }
}, initialState);
