import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';
import PropTypes from "prop-types";

function ProductGrid({ products, getCategoryName, onAdd }) {
    if (products.length === 0) {
        return (
            <div className="empty-state show">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p>Ничего не найдено</p>
                <span>Попробуйте изменить запрос или фильтр</span>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map((p) => (
                <ProductCard
                    key={p.id}
                    product={p}
                    categoryName={getCategoryName(p.category)}
                    onAdd={onAdd}
                />
            ))}
        </div>
    );
}

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            oldPrice: PropTypes.number,
            rating: PropTypes.number.isRequired,
            reviews: PropTypes.number.isRequired,
            emoji: PropTypes.string.isRequired,
            badge: PropTypes.oneOf(['sale', 'new']),
        })
    ).isRequired,
    getCategoryName: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};


export default ProductGrid;