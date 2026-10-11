import { getAuthToken } from '../utils/authStorage';

const API_BASE_URL = 'http://81.26.178.20:8080/api';

export async function apiRequest(path, { method = 'GET', body } = {}) {
    const options = {
        method,
        headers: {},
    };

    const token = getAuthToken();
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, options);
    } catch {
        throw new Error('Сервер недоступен');
    }

    if (response.status === 204) {
        return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const message = data?.error || `Ошибка запроса (${response.status})`;
        throw new Error(message);
    }

    return data;
}