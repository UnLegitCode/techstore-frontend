import PropTypes from 'prop-types';
import './FormField.css';

function FormField({ id, label, hint, error, children }) {
    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            {children}
            {hint && !error && <span className="form-field-hint">{hint}</span>}
            {error && <span className="form-field-error">{error}</span>}
        </div>
    );
}

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    hint: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default FormField;
