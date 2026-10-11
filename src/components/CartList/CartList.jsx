import PropTypes from 'prop-types';
import CartItem from '../CartItem/CartItem';
import './CartList.css';

function CartList({ items, busy = false, onQuantityChange, onRemove }) {
    return (
        <div className="cart-list">
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    busy={busy}
                    onQuantityChange={onQuantityChange}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

CartList.propTypes = {
    items: PropTypes.array.isRequired,
    busy: PropTypes.bool,
    onQuantityChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CartList;
