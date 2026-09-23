import api from "./axios";

export const createBudget = (data) => api.post('/budgets/create', data);
export const getBudget = (id) => api.get(`/budgets/${id}`);
export const getUserBudgets = (sortBy, sortDir) => api.get('/budgets', { params: { sortBy, sortDir } });
export const getBudgetProgress = (id) => api.get(`/budgets/${id}/progress`);
export const getUserBudgetProgress = () => api.get(`/budgets/progress`);
export const updateBudget = (id, data) => api.put(`/budgets/${id}`, data);
export const deleteBudget = (id) => api.delete(`/budgets/${id}`);

