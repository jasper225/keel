import api from "./axios";

export const createAccount = (data) => api.post('/accounts/create', data);
export const getAccountById = (id) => api.get(`/accounts/${id}`);
export const getUserAccounts = (sortBy, sortDir) => api.get('/accounts', sortBy, sortDir);
export const getNetWorth = () => api.get('/accounts/netWorth');
export const getAccountBalance = (id) => api.get(`/accounts/${id}/balance`);
export const updateAccount = (id, data) => api.put(`/accounts/${id}`, data);
export const deleteAccount = (id) => api.delete(`/accounts/${id}`);