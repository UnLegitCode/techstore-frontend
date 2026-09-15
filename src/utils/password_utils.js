export function getPasswordStrength(value) {
    if (!value) {
        return { score: 0, level: null, label: '', filled: 0, color: '' };
    }

    let score = 0;

    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) {
        return { score, level: 'weak', label: 'Слабый пароль', filled: 1, color: '#dc2626' };
    }
    if (score <= 3) {
        return { score, level: 'medium', label: 'Средний пароль', filled: 2, color: '#f59e0b' };
    }

    return { score, level: 'strong', label: 'Надёжный пароль', filled: 3, color: '#16a34a' };
}