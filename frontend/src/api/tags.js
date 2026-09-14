import api from "./axios";

export const createTag = (data) => api.post('/tags/create', data);
export const getTag = (id) => api.get(`/tags/${id}`);
export const getUserTags = () => api.get('/tags');
export const renameTag = (id, data) => api.get(`/tags/${id}`, data);
export const deleteTag = (id) => api.delete(`/tags/${id}`);

