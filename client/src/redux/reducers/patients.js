import { ADD_PATIENT, UPDATE_PATIENT, REMOVE_PATIENT } from "../constants";
import produce from "immer";

const initialState = [];

export const patientReducer = produce((draft, action) => {
  switch (action.type) {
    case UPDATE_PATIENT:
      const updatePatient = draft.map((v) => {
        if (v._id === action.payload._id) {
          return action.payload;
        }
        return v;
      });
      draft = [...updatePatient];
      return draft;
    case ADD_PATIENT:
      draft = [...action.payload];
      return draft;
    case REMOVE_PATIENT:
      const removePatient = draft.filter((t) => {
        return t._id !== action.payload._id;
      });
      draft = [...removePatient];
      return draft;
    default:
      return draft;
  }
}, initialState);
