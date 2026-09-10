import axios from "./axios";

export const createTransaction = (data) => axios.post('/transactions/create', data);
export const getTransaction = (id) => axios.get(`/transactions/${id}`);
export const getUserTransactions = (filters = {}) => axios.get('/transactions', { params: filters });
export const getTransactionTags = (id) => axios.get(`/transactions/${id}/tags`);
export const attachTag = (id, data) => axios.post(`/transactions/${id}/tags`, data);
export const detachTag = (id, tagId) => axios.delete(`/transactions/${id}/tags/${tagId}`);
export const updateTransaction = (id, data) => axios.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => axios.delete(`/transactions/${id}`);

