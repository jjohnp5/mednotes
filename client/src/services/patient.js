import axios from "axios";

export const getPatientsByUserId = (userId) =>
  axios.get("/api/patient", { params: { userId } });

export const getPatientById = (patientId, userId) =>
  axios.get(`/api/patient/${patientId}`, { params: { userId } });

export const createPatient = (patient) =>
  axios.post("/api/patient", patient, { params: { userId: patient.user } });

export const updatePatient = (patient) =>
  axios.put(`/api/patient/${patient._id}`, patient, {
    params: { userId: patient.user },
  });

export const deletePatient = (patient) =>
  axios.delete(`/api/patient/${patient._id}`, {
    params: { userId: patient.user },
  });
