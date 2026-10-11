const TOKEN_KEY = 'techstore_token';
const EMAIL_KEY = 'techstore_email';
const ROLE_KEY = 'techstore_role';

export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthEmail() {
    return localStorage.getItem(EMAIL_KEY);
}

export function setAuthEmail(email) {
    localStorage.setItem(EMAIL_KEY, email);
}

export function getAuthRole() {
    return localStorage.getItem(ROLE_KEY);
}

export function setAuthRole(role) {
    if (role) {
        localStorage.setItem(ROLE_KEY, role);
    } else {
        localStorage.removeItem(ROLE_KEY);
    }
}

export function clearAuthStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(ROLE_KEY);
}