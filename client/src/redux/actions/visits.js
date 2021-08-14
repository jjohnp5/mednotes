import {
  ADD_VISIT,
  UPDATE_VISIT,
  REMOVE_VISIT,
  REMOVE_PATIENT_VISITS,
} from "../constants";

const addVisit = (payload) => {
  return {
    type: ADD_VISIT,
    payload,
  };
};

const removeVisit = (payload) => {
  return {
    type: REMOVE_VISIT,
    payload,
  };
};

const updateVisit = (payload) => {
  return {
    type: UPDATE_VISIT,
    payload,
  };
};

const removePatientVisits = (payload) => {
  return {
    type: REMOVE_PATIENT_VISITS,
    payload,
  };
};

export const handleAddVisit = (payload) => (dispatch) => {
  return dispatch(addVisit(payload));
};

export const handleRemoveVisit = (payload) => (dispatch) => {
  return dispatch(removeVisit(payload));
};

export const handleUpdateVisit = (payload) => (dispatch) => {
  return dispatch(updateVisit(payload));
};

export const handleRemovePatientVisits = (patientId) => (dispatch) =>
  dispatch(removePatientVisits(patientId));
