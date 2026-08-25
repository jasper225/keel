import axios from "./axios";

export const createTag = (data) => axios.post('/tags/create', data);
export const getUserTags = () => axios.get('/tags');
export const renameTag = (id, data) => axios.get(`/tags/${id}`, data);
export const deleteTag = (id) => axios.delete(`/tags/${id}`);
export const attachTag = (transactionId, tagId) => axios.post(`/tags/${transactionId}/attach`, tagId);
export const detachTag = (transactionId, tagId) => axios.delete(`/tags/${transactionId}`, tagId);
export const getTransactionTags = (transactionId) => axios.get(`/tags/${transactionId}/tags`);
export const getTagTransactions = (tagId) => axios.get(`/tags/${tagId}/transactions`);
