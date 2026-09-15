import { useState, useCallback } from 'react';
import { validateEmail } from '../utils/validators';

function useEmailValidation(
    {
        emptyError = 'Введите корректный email',
        validateEmpty = false,
    } = {}
) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);

    const handleChange = useCallback((newValue) => {
        setValue(newValue);
        setTouched(true);

        if (!newValue) {
            setError(validateEmpty ? emptyError : '');
            return;
        }
        if (!validateEmail(newValue)) {
            setError(emptyError);
        } else {
            setError('');
        }
    }, [emptyError, validateEmpty]);

    const validateAll = useCallback(() => {
        setTouched(true);
        if (!validateEmail(value)) {
            setError(emptyError);
            return false;
        }
        setError('');
        return true;
    }, [value, emptyError]);

    const state = !touched || !value ? '' : error ? 'error' : 'valid';

    return { value, error, state, handleChange, validateAll };
}

export default useEmailValidation;