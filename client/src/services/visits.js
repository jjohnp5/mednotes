import axios from "axios";

export const getVisitsById = (visitId, userId) =>
  axios.get(`/api/visit/${visitId}`, { params: { userId } });

export const createVisit = (visit, userId) =>
  axios.post("/api/visit", visit, { params: { userId } });

export const updateVisitById = (visit, userId) =>
  axios.put(`/api/visit/${visit._id}`, visit, { params: { userId } });

export const deleteVisit = (visit, userId) =>
  axios.delete(`/api/visit/${visit._id}`, { params: { userId } });
