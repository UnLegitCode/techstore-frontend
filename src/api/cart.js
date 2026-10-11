import { apiRequest } from './client';

export function getCart() {
    return apiRequest('/cart');
}

export function addItem(item) {
    return apiRequest('/cart', { method: 'POST', body: item });
}

export function clearCart() {
    return apiRequest('/cart', { method: 'DELETE' });
}

export function updateItemQuantity(itemId, quantity) {
    return apiRequest(`/cart/${itemId}`, { method: 'PUT', body: { quantity } });
}

export function removeItem(itemId) {
    return apiRequest(`/cart/${itemId}`, { method: 'DELETE' });
}