import './Divider.css';
import PropTypes from "prop-types";

function Divider({ children }) {
    return <div className="divider">{children}</div>;
}

Divider.propTypes = {
    children: PropTypes.node
};

export default Divider;