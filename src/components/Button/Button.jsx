import './Button.css';
import PropTypes from "prop-types";

function Button(
    {
        variant = 'primary',
        size = 'md',
        icon,
        children,
        type = 'button',
        className = '',
        ...rest
    }
) {
    const classes = [
        'btn',
        `btn-${variant}`,
        size === 'sm' && 'btn-sm',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button type={type} className={classes} {...rest}>
            {icon}
            {children}
        </button>
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    icon: PropTypes.node,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
};

export default Button;