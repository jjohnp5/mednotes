import axios from "axios";

export const login = (payload) => axios.post("/login", payload);

export const register = (payload) => axios.post("/api/user", payload);

export const updateUserInfo = (payload) =>
  axios.post(`/api/user/${payload.id}`, payload);

export const getUserInfo = (id) =>
  axios.get(`/api/user/${id}`, { params: { userId: id } });
