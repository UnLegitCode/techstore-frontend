import { categories } from '../../data/products';
import './CategoryGrid.css';

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

export default CategoryGrid;