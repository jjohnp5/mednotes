import axios from "axios";

export const getTemplateByUserId = (userId) =>
  axios.get("/api/template", { params: { userId } });

export const getTemplateById = (templateId, userId) =>
  axios.get(`/api/template/${templateId}`, { params: { userId } });

export const createTemplate = (template) =>
  axios.post("/api/template", template, { params: template.user });

export const updateTemplate = (template) =>
  axios.put(`/api/template/${template._id}`, template, {
    params: { userId: template.user },
  });

export const deleteTemplate = (template) =>
  axios.delete(`/api/template/${template._id}`, {
    params: { userId: template.user },
  });
