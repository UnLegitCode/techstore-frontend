import './SuccessMessage.css';

function SuccessMessage({ email }) {
    return (
        <div className="success-message show">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div className="success-content">
                <strong>Письмо отправлено!</strong>
                <span>
          Проверьте почту <em>{email}</em> и перейдите по ссылке из письма.
        </span>
            </div>
        </div>
    );
}

export default SuccessMessage;