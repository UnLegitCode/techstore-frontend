import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    getAuthToken,
    setAuthToken,
    getAuthEmail,
    setAuthEmail,
    getAuthRole,
    setAuthRole,
    clearAuthStorage,
} from '../utils/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(getAuthToken);
    const [email, setEmail] = useState(getAuthEmail);
    const [role, setRole] = useState(getAuthRole);

    const loginAuth = useCallback((authData) => {
        setAuthToken(authData.token);
        setAuthEmail(authData.email);
        setAuthRole(authData.role);
        setToken(authData.token);
        setEmail(authData.email);
        setRole(authData.role ?? null);
    }, []);

    const logoutAuth = useCallback(() => {
        clearAuthStorage();
        setToken(null);
        setEmail(null);
        setRole(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            token,
            email,
            role,
            isAdmin: role === 'ADMIN',
            isAuthenticated: Boolean(token),
            loginAuth,
            logoutAuth,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used within <AuthProvider>');

    return context;
}