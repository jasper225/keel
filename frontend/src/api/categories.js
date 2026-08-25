import axios from "./axios";

export const createCategory = (data) => axios.post('/categories/create', data);
export const getUserCategories = () => axios.get('/categories');
export const getChildrenCategories = (id) => axios.get(`/categories/${id}/children`);
export const updateCategory = (id, data) => axios.put(`/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`/categories/${id}`);