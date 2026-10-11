import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './EmptyCart.css';

function EmptyCart({ title, message, actionLabel, onAction }) {
    return (
        <div className="cart-empty">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>{title}</h2>
            <p>{message}</p>
            <Button variant="primary" onClick={onAction}>
                {actionLabel}
            </Button>
        </div>
    );
}

EmptyCart.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    actionLabel: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
};

export default EmptyCart;
