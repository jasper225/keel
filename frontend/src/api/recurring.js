import api from "./axios";

export const createRecurring = (data) => api.post('/recurringTransactions/create', data);
export const getRecurringById = (id) => api.get(`/recurringTransactions/${id}`);
export const getRecurringByUser = (filters = {}) => api.get('/recurringTransactions', { params: filters });
export const getUpcomingRecurring = () => api.get('/recurringTransactions/upcoming');
export const runRecurring = (id, data) => api.post(`/recurringTransactions/${id}/run`, data);
export const resumeRecurring = (id, data) => api.post(`/recurringTransactions/${id}/resume`, data);
export const pauseRecurring = (id, data) => api.post(`/recurringTransactions/${id}/pause`, data);
export const updateRecurring = (id, data) => api.put(`/recurringTransactions/${id}`, data);
export const deleteRecurring  = (id) => api.delete(`/recurringTransactions/${id}`);