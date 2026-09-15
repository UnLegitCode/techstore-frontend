import { categories } from '../../data/products';
import './CategoryGrid.css';
import PropTypes from "prop-types";

function CategoryGrid({ onSelect }) {
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
                    <span className="category-name">{cat.name}</span>
                </button>
            ))}
        </div>
    );
}

CategoryGrid.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default CategoryGrid;