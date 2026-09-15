import { useState, useCallback } from 'react';
import { validateEmail } from '../utils/validators';

export function useAuthValidation({ minPasswordLength = 6 } = {}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const handleEmailChange = useCallback((value) => {
        setEmail(value);
        if (!emailTouched) setEmailTouched(true);

        if (!value) {
            setEmailError('');
            return;
        }
        if (!validateEmail(value)) {
            setEmailError('Введите корректный email');
        } else {
            setEmailError('');
        }
    }, [emailTouched]);

    const handlePasswordChange = useCallback((value) => {
        setPassword(value);
        if (!passwordTouched) setPasswordTouched(true);

        if (!value) {
            setPasswordError('');
            return;
        }
        if (value.length < minPasswordLength) {
            setPasswordError(`Пароль должен содержать минимум ${minPasswordLength} символов`);
        } else {
            setPasswordError('');
        }
    }, [passwordTouched, minPasswordLength]);

    const validateAll = useCallback(() => {
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Введите корректный email');
            setEmailTouched(true);
            valid = false;
        }

        if (!password) {
            setPasswordError('Введите пароль');
            setPasswordTouched(true);
            valid = false;
        } else if (password.length < minPasswordLength) {
            setPasswordError(`Пароль должен содержать минимум ${minPasswordLength} символов`);
            setPasswordTouched(true);
            valid = false;
        }

        return valid;
    }, [email, password, minPasswordLength]);

    const emailState = !emailTouched || !email ? '' : emailError ? 'error' : 'valid';

    const passwordState = !passwordTouched || !password ? '' : passwordError ? 'error' : 'valid';

    return {
        email,
        password,
        emailError,
        passwordError,
        emailState,
        passwordState,
        handleEmailChange,
        handlePasswordChange,
        validateAll,
    };
}