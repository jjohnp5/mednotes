import { ADD_PATIENT, UPDATE_PATIENT, REMOVE_PATIENT } from "../constants";

const addPatient = (payload) => {
  return {
    type: ADD_PATIENT,
    payload,
  };
};

const removePatient = (payload) => {
  return {
    type: REMOVE_PATIENT,
    payload,
  };
};

const updatePatient = (payload) => {
  return {
    type: UPDATE_PATIENT,
    payload,
  };
};

export const handleAddPatient = (payload) => (dispatch) => {
  return dispatch(addPatient(payload));
};

export const handleRemovePatient = (payload) => (dispatch) => {
  return dispatch(removePatient(payload));
};

export const handleUpdatePatient = (payload) => (dispatch) => {
  return dispatch(updatePatient(payload));
};
