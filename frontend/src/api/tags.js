import axios from "./axios";

export const createTag = (data) => axios.post('/tags/create', data);
export const getTag = (id) => axios.get(`/tags/${id}`);
export const getUserTags = () => axios.get('/tags');
export const renameTag = (id, data) => axios.get(`/tags/${id}`, data);
export const deleteTag = (id) => axios.delete(`/tags/${id}`);

