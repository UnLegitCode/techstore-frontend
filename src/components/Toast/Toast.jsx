import { useCart } from '../../contexts/CartContext';
import './Toast.css';

function Toast() {
    const { toastMessage, toastVisible } = useCart();

    return (
        <div className={`toast ${toastVisible ? 'show' : ''}`}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{toastMessage}</span>
        </div>
    );
}

Toast.propTypes = {}

export default Toast;