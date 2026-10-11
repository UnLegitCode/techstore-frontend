import PropTypes from 'prop-types';
import PlusIcon from '../Icons/PlusIcon.jsx';
import MinusIcon from '../Icons/MinusIcon.jsx';
import './QuantityStepper.css';

function QuantityStepper({ value, min = 1, max = 99, disabled = false, onChange }) {
    return (
        <div className="quantity-stepper">
            <button
                type="button"
                className="qty-btn"
                onClick={() => onChange(value - 1)}
                disabled={disabled || value <= min}
                aria-label="Уменьшить количество"
            >
                <MinusIcon />
            </button>
            <span className="qty-value">{value}</span>
            <button
                type="button"
                className="qty-btn"
                onClick={() => onChange(value + 1)}
                disabled={disabled || value >= max}
                aria-label="Увеличить количество"
            >
                <PlusIcon />
            </button>
        </div>
    );
}

QuantityStepper.propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default QuantityStepper;
