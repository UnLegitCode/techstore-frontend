import { apiRequest } from './client';

export function register(data) {
    return apiRequest('/auth/register', { method: 'POST', body: data });
}

export function login(data) {
    return apiRequest('/auth/login', { method: 'POST', body: data });
}

export function requestPasswordReset(data) {
    return apiRequest('/auth/password-reset/request', { method: 'POST', body: data });
}

export function confirmPasswordReset(data) {
    return apiRequest('/auth/password-reset/confirm', { method: 'POST', body: data });
}