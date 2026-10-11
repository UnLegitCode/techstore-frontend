import './Filters.css';
import PropTypes from "prop-types";

function Filters({ categories, active, onChange }) {
    const chips = [{ id: 'all', title: 'Все' }, ...categories];

    return (
        <div className="filters">
            {chips.map((chip) => (
                <button
                    key={chip.id}
                    type="button"
                    className={`filter-chip ${active === chip.id ? 'active' : ''}`}
                    onClick={() => onChange(chip.id)}
                >
                    {chip.title}
                </button>
            ))}
        </div>
    );
}

Filters.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Filters;