import {
  ADD_FIELDMAP,
  UPDATE_FIELDMAP,
  REMOVE_FIELDMAP,
  REMOVE_TEMPLATE_FIELDMAP,
} from "../constants";

const addFieldmap = (payload) => {
  return {
    type: ADD_FIELDMAP,
    payload,
  };
};

const removeFieldmap = (payload) => {
  return {
    type: REMOVE_FIELDMAP,
    payload,
  };
};

const updateFieldmap = (payload) => {
  return {
    type: UPDATE_FIELDMAP,
    payload,
  };
};

const removeTemplateFieldmaps = (payload) => {
  return {
    type: REMOVE_TEMPLATE_FIELDMAP,
    payload,
  };
};

export const handleAddFieldmap = (payload) => (dispatch) => {
  return dispatch(addFieldmap(payload));
};

export const handleRemoveFieldmap = (payload) => (dispatch) => {
  return dispatch(removeFieldmap(payload));
};

export const handleUpdateFieldmap = (payload) => (dispatch) => {
  return dispatch(updateFieldmap(payload));
};

export const handleRemoveTemplateFieldmaps = (templateId) => (dispatch) =>
  dispatch(removeTemplateFieldmaps(templateId));
