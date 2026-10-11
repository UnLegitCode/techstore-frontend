import { apiRequest } from './client';

export function getProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            query.set(key, value);
        }
    });
    const queryString = query.toString();

    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
}

export function getProduct(id) {
    return apiRequest(`/products/${id}`);
}

export function createProduct(product) {
    return apiRequest('/products', { method: 'POST', body: product });
}

export function updateProduct(id, product) {
    return apiRequest(`/products/${id}`, { method: 'PUT', body: product });
}

export function deleteProduct(id) {
    return apiRequest(`/products/${id}`, { method: 'DELETE' });
}