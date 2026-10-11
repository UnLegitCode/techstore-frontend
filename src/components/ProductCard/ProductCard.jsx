import { formatters } from '../../utils/formatters.js';
import { renderers } from '../../utils/renderers.js';
import './ProductCard.css';
import PlusIcon from "../Icons/PlusIcon.jsx";
import PropTypes from "prop-types";

function ProductCard({ product, categoryName, onAdd, adding = false }) {
    const { title, price, previousPrice, rating, reviews, emoji, badge } = product;

    return (
        <article className="product-card">
            <div className="product-image">
                {badge === 'sale' && <span className="product-badge">Sale</span>}
                {badge === 'new' && <span className="product-badge new">New</span>}
                <span>{emoji}</span>
            </div>
            <div className="product-body">
                <div className="product-category">{categoryName}</div>
                <h3 className="product-title">{title}</h3>
                <div className="product-rating">
                    <span className="stars">{renderers(rating)}</span>
                    <span>{rating} · {reviews} отзывов</span>
                </div>
                <div className="product-footer">
                    <div className="product-price">
                        <span className="price-current">{formatters(price)}</span>
                        {previousPrice != null && <span className="price-old">{formatters(previousPrice)}</span>}
                    </div>
                    <button
                        type="button"
                        className="add-to-cart"
                        onClick={() => onAdd(product)}
                        disabled={adding}
                        aria-label="Добавить в корзину"
                    >
                        <PlusIcon/>
                    </button>
                </div>
            </div>
        </article>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        previousPrice: PropTypes.number,
        rating: PropTypes.number.isRequired,
        reviews: PropTypes.number.isRequired,
        emoji: PropTypes.string.isRequired,
        badge: PropTypes.oneOf(['sale', 'new']),
    }).isRequired,
    categoryName: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    adding: PropTypes.bool,
};

export default ProductCard;