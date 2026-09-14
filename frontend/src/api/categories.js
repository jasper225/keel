import api from "./axios";

export const createCategory = (data) => api.post('/categories/create', data);
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const getUserCategories = () => api.get('/categories');
export const getChildrenCategories = (id) => api.get(`/categories/${id}/children`);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);