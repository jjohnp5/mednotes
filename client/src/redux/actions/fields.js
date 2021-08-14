import {
  ADD_FIELD,
  UPDATE_FIELD,
  REMOVE_FIELD,
  REMOVE_TEMPLATE_FIELD,
} from "../constants";

const addField = (payload) => {
  return {
    type: ADD_FIELD,
    payload,
  };
};

const removeField = (payload) => {
  return {
    type: REMOVE_FIELD,
    payload,
  };
};

const updateField = (payload) => {
  return {
    type: UPDATE_FIELD,
    payload,
  };
};

const removeTemplateFields = (payload) => {
  return {
    type: REMOVE_TEMPLATE_FIELD,
    payload,
  };
};

export const handleAddField = (payload) => (dispatch) => {
  return dispatch(addField(payload));
};

export const handleRemoveField = (payload) => (dispatch) => {
  return dispatch(removeField(payload));
};

export const handleUpdateField = (payload) => (dispatch) => {
  return dispatch(updateField(payload));
};

export const handleRemoveTemplateFields = (templateId) => (dispatch) =>
  dispatch(removeTemplateFields(templateId));
