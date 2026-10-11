import { apiRequest } from './client';

export function getCategories() {
    return apiRequest('/categories');
}

export function getCategory(id) {
    return apiRequest(`/categories/${id}`);
}

export function createCategory(category) {
    return apiRequest('/categories', { method: 'POST', body: category });
}

export function updateCategory(id, category) {
    return apiRequest(`/categories/${id}`, { method: 'PUT', body: category });
}

export function deleteCategory(id) {
    return apiRequest(`/categories/${id}`, { method: 'DELETE' });
}