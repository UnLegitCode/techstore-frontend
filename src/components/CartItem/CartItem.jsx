import PropTypes from 'prop-types';
import { formatters } from '../../utils/formatters';
import QuantityStepper from '../QuantityStepper/QuantityStepper';
import TrashIcon from '../Icons/TrashIcon.jsx';
import './CartItem.css';

function CartItem({ item, busy = false, onQuantityChange, onRemove }) {
    const { id, product, quantity } = item;
    const lineTotal = product.price * quantity;

    return (
        <article className="cart-item">
            <div className="cart-item-image">
                {product.badge === 'sale' && <span className="cart-item-badge">Sale</span>}
                <span>{product.emoji}</span>
            </div>

            <div className="cart-item-info">
                {product.category?.title && (
                    <div className="cart-item-category">{product.category.title}</div>
                )}
                <h3 className="cart-item-title">{product.title}</h3>
                <div className="cart-item-price">{formatters(product.price)}</div>
            </div>

            <div className="cart-item-controls">
                <QuantityStepper
                    value={quantity}
                    disabled={busy}
                    onChange={(next) => onQuantityChange(id, next)}
                />
                <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => onRemove(id)}
                    disabled={busy}
                    aria-label="Удалить из корзины"
                >
                    <TrashIcon />
                </button>
            </div>

            <div className="cart-item-total">{formatters(lineTotal)}</div>
        </article>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        quantity: PropTypes.number.isRequired,
        product: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            emoji: PropTypes.string,
            badge: PropTypes.oneOf(['sale', 'new']),
            category: PropTypes.shape({
                title: PropTypes.string,
            }),
        }).isRequired,
    }).isRequired,
    busy: PropTypes.bool,
    onQuantityChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CartItem;
