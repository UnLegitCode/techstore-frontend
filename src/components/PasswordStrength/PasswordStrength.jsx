import { getPasswordStrength } from '../../utils/password_utils.js';
import './PasswordStrength.css';

function PasswordStrength({ password }) {
    const { level, label, filled, color } = getPasswordStrength(password);

    return (
        <>
            <div className="password-strength">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`strength-bar ${i < filled ? level : ''}`}
                    />
                ))}
            </div>
            <div className="strength-text" style={{ color }}>
                {label}
            </div>
        </>
    );
}

export default PasswordStrength;