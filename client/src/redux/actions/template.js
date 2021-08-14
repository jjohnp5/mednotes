import { ADD_TEMPLATE, UPDATE_TEMPLATE, REMOVE_TEMPLATE } from "../constants";

const addTemplate = (payload) => {
  return {
    type: ADD_TEMPLATE,
    payload,
  };
};

const removeTemplate = (payload) => {
  return {
    type: REMOVE_TEMPLATE,
    payload,
  };
};

const updateTemplate = (payload) => {
  return {
    type: UPDATE_TEMPLATE,
    payload,
  };
};

export const handleAddTemplate = (payload) => (dispatch) => {
  return dispatch(addTemplate(payload));
};

export const handleRemoveTemplate = (payload) => (dispatch) => {
  return dispatch(removeTemplate(payload));
};

export const handleUpdateTemplate = (payload) => (dispatch) => {
  return dispatch(updateTemplate(payload));
};
