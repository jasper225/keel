import axios from "./axios";

export const createRecurringTxn = (data) => axios.post('/recurringTransactions/create', data);
export const getRecurringTxnById = (id) => axios.get(`/recurringTransactions/${id}`);
export const getRecurringTxnByUser = (filters = {}) => axios.get('/recurringTransactions', { params: filters });
export const getUpcomingRecurringTxn = () => axios.get('/recurringTransactions');
export const runRecurringTxn = (id, data) => axios.post(`/recurringTransactions/${id}/run`, data);
export const resumeRecurringTxn = (id, data) => axios.post(`/recurringTransactions/${id}/resume`, data);
export const pauseRecurringTxn = (id, data) => axios.post(`/recurringTransactions/${id}/pause`, data);
export const deleteRecurringTxn  = (id) => axios.delete(`/recurringTransactions/${id}`);