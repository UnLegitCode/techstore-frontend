import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

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

export default ProductGrid;