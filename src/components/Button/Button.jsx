import './Button.css';

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

export default Button;