import './CategoryGrid.css';
import PropTypes from "prop-types";

function CategoryGrid({ categories, onSelect }) {
    return (
        <div className="category-grid">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    type="button"
                    className="category-card"
                    onClick={() => onSelect(cat.id)}
                >
                    <span className="category-emoji">{cat.emoji}</span>
                    <span className="category-name">{cat.title}</span>
                </button>
            ))}
        </div>
    );
}

CategoryGrid.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            emoji: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default CategoryGrid;