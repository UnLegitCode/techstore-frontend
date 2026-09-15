import {useState, useCallback, useEffect} from 'react';
import {validateEmail} from '../utils/validators';

function useRegisterValidation({minPasswordLength = 6} = {}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmTouched, setConfirmTouched] = useState(false);

    const handleEmailChange = useCallback((value) => {
        setEmail(value);
        setEmailTouched(true);
        if (!value) {
            setEmailError('');
        } else if (!validateEmail(value)) {
            setEmailError('Введите корректный email');
        } else {
            setEmailError('');
        }
    }, []);

    const handlePasswordChange = useCallback((value) => {
        setPassword(value);
        setPasswordTouched(true);
        if (!value) {
            setPasswordError('');
        } else if (value.length < minPasswordLength) {
            setPasswordError(`Пароль должен содержать минимум ${minPasswordLength} символов`);
        } else {
            setPasswordError('');
        }
    }, [minPasswordLength]);

    const validateConfirm = useCallback((confirmValue, passwordValue) => {
        if (!confirmValue) {
            setConfirmError('');
            return;
        }
        if (confirmValue === passwordValue) {
            setConfirmError('');
        } else {
            setConfirmError('Пароли не совпадают');
        }
    }, []);

    const handleConfirmChange = useCallback((value) => {
        setConfirm(value);
        setConfirmTouched(true);
        validateConfirm(value, password);
    }, [password, validateConfirm]);

    useEffect(() => {
        if (confirmTouched && confirm) {
            validateConfirm(confirm, password);
        }
    }, [password, confirm, confirmTouched, validateConfirm]);

    const validateAll = useCallback(() => {
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Введите корректный email');
            setEmailTouched(true);
            valid = false;
        }

        if (password.length < minPasswordLength) {
            setPasswordError(`Пароль должен содержать минимум ${minPasswordLength} символов`);
            setPasswordTouched(true);
            valid = false;
        }

        if (confirm !== password) {
            setConfirmError('Пароли не совпадают');
            setConfirmTouched(true);
            valid = false;
        }

        return valid;
    }, [email, password, confirm, minPasswordLength]);

    const emailState = !emailTouched || !email ? '' : emailError ? 'error' : 'valid';
    const passwordState = !passwordTouched || !password ? '' : passwordError ? 'error' : 'valid';
    const confirmState = !confirmTouched || !confirm ? '' : confirmError ? 'error' : 'valid';

    return {
        email, password, confirm,
        emailError, passwordError, confirmError,
        emailState, passwordState, confirmState,
        handleEmailChange,
        handlePasswordChange,
        handleConfirmChange,
        validateAll,
    };
}

export default useRegisterValidation;