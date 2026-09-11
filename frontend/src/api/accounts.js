import axios from "./axios";

export const createAccount = (data) => axios.post('/accounts/create', data);
export const getAccountById = (id) => axios.get(`/accounts/${id}`);
export const getUserAccounts = () => axios.get('/accounts');
export const getNetWorth = () => axios.get('/accounts');
export const getAccountBalance = (id) => axios.get(`/accounts/${id}/balance`);
export const updateAccount = (id, data) => axios.put(`/accounts/${id}`, data);
export const deleteAccount = (id) => axios.delete(`/accounts/${id}`);