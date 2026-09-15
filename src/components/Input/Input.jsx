import {useState} from 'react';
import './Input.css';
import PropTypes from "prop-types";

const EyeIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

const MailIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 6L2 7"/>
    </svg>
);

const LockIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
);

const ICONS = {
    mail: MailIcon,
    lock: LockIcon,
};

function Input(
    {
        id,
        label,
        type = 'text',
        icon,
        value,
        onChange,
        placeholder,
        error,
        state = '',
        autoComplete,
    }
) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const realType = isPassword && showPassword ? 'text' : type;

    const Icon = icon ? ICONS[icon] : null;

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <div className="input-wrapper">
                <input
                    id={id}
                    type={realType}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={state}
                />
                {Icon && (
                    <span className="input-icon">
            <Icon/>
          </span>
                )}
                {isPassword && (
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        style={{color: showPassword ? '#2563eb' : '#94a3b8'}}
                    >
                        <EyeIcon/>
                    </button>
                )}
            </div>
            {error && <div className="error-message show">{error}</div>}
        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url']),
    icon: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    state: PropTypes.string,
    autoComplete: PropTypes.string,
};

export default Input;