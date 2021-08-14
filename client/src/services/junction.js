import axios from "axios";

export const getJunctionById = (junctionId, userId) =>
  axios.get(`/api/junction/${junctionId}`, { params: { userId } });

export const createJunction = (junction, userId) =>
  axios.post("/api/junction", junction, { params: { userId } });

export const updateJunctionById = (junction, userId) =>
  axios.put(`/api/junction/${junction._id}`, junction, { params: { userId } });

export const deleteJunction = (junction, userId) =>
  axios.delete(`/api/junction/${junction._id}`, { params: { userId } });
