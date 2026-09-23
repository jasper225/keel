import api from "./axios";

export const createTag = (data) => api.post('/tags', data);
export const getTag = (id) => api.get(`/tags/${id}`);
export const getUserTags = (sortBy, sortDir) =>
	api.get('/tags', { params: { sortBy, sortDir } });
export const getTagTransactions = (id) => api.get(`/tags/${id}/transactions`);
export const getTagCounts = (id) => api.get(`/tags/${id}/count`);
export const renameTag = (id, data) => api.put(`/tags/${id}/rename`, data);
export const deleteTag = (id) => api.delete(`/tags/${id}`);

