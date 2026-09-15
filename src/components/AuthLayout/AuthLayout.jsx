import './AuthLayout.css';
import PropTypes from "prop-types";

function AuthLayout({ children }) {
    return <div className="auth-layout">{children}</div>;
}

AuthLayout.propTypes = {
    children: PropTypes.node
};

export default AuthLayout;