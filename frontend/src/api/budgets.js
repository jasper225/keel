import axios from "./axios";

export const createBudget = (data) => axios.post('/budgets/create', data);
export const getBudget = (id) => axios.get(`/budgets/${id}`);
export const getUserBudgets = (filters = {}) => axios.get('/budgets', { params: filters });
export const updateBudget = (id, data) => axios.put(`/budgets/${id}`, data);
export const deleteBudget = (id) => axios.delete(`/budgets/${id}`);

