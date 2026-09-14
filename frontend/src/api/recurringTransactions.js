import api from "./axios";

export const createRecurringTxn = (data) => api.post('/recurringTransactions/create', data);
export const getRecurringTxnById = (id) => api.get(`/recurringTransactions/${id}`);
export const getRecurringTxnByUser = (filters = {}) => api.get('/recurringTransactions', { params: filters });
export const getUpcomingRecurringTxn = () => api.get('/recurringTransactions/upcoming');
export const runRecurringTxn = (id, data) => api.post(`/recurringTransactions/${id}/run`, data);
export const resumeRecurringTxn = (id, data) => api.post(`/recurringTransactions/${id}/resume`, data);
export const pauseRecurringTxn = (id, data) => api.post(`/recurringTransactions/${id}/pause`, data);
export const deleteRecurringTxn  = (id) => api.delete(`/recurringTransactions/${id}`);