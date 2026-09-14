import api from "./axios";

export const createTransaction = (data) => api.post('/transactions/create', data);
export const getTransaction = (id) => api.get(`/transactions/${id}`);
export const getUserTransactions = (filters = {}) => api.get('/transactions', { params: filters });
export const getRecentTransactions = () => api.get('/transactions/recent');
export const getIncomeVsExpense = () => api.get('/transactions/incomeVsExpense');
export const getSpendingByCategory = () => api.get('/transactions/spendingByCategory');
export const getTransactionTags = (id) => api.get(`/transactions/${id}/tags`);
export const attachTag = (id, data) => api.post(`/transactions/${id}/tags`, data);
export const detachTag = (id, tagId) => api.delete(`/transactions/${id}/tags/${tagId}`);
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

