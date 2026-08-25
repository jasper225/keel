import axios from "./axios";

export const createBudget = (data) => axios.post('/accounts/create', data);
export const getUserBudgets = () => axios.get('/budgets');
export const getBudgetsByCategory = (id) => axios.get(`/budgets/${id}`);
export const updateBudget = (id, data) => axios.put(`/budgets/${id}`, data);
export const deleteBudget = (id) => axios.delete(`/budgets/${id}`);

