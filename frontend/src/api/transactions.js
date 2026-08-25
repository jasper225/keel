import axios from "./axios";

export const createTransaction = (data) => axios.post('/transactions/create', data);
export const getTransaction = (id) => axios.get(`/transactions/${id}`);
export const getUserTransactions = () => axios.get('/transactions');
export const getAccountTransactions = (id) => axios.get(`/transactions/${id}`);
export const updateTransaction = (id, data) => axios.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => axios.delete(`/transactions/${id}`);

