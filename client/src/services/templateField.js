import axios from "axios";

export const getFieldById = (fieldId, userId) =>
  axios.get(`/api/field/${fieldId}`, { params: { userId } });

export const createField = (field, userId) =>
  axios.post("/api/field", field, { params: { userId } });

export const updateFieldById = (field, userId) =>
  axios.put(`/api/field/${field._id}`, field, { params: { userId } });

export const deleteField = (field, userId) =>
  axios.delete(`/api/field/${field._id}`, { params: { userId } });
