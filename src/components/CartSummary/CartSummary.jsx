import PropTypes from 'prop-types';
import { formatters } from '../../utils/formatters';
import Button from '../Button/Button';
import TrashIcon from '../Icons/TrashIcon.jsx';
import './CartSummary.css';

function CartSummary({
    totalQuantity,
    totalPrice,
    clearing = false,
    onClear,
    onCheckout,
}) {
    return (
        <aside className="cart-summary">
            <h2>Итого</h2>

            <div className="summary-row">
                <span>Товары ({totalQuantity})</span>
                <span>{formatters(totalPrice)}</span>
            </div>
            <div className="summary-row">
                <span>Доставка</span>
                <span className="summary-free">Бесплатно</span>
            </div>

            <div className="summary-total">
                <span>К оплате</span>
                <span>{formatters(totalPrice)}</span>
            </div>

            <Button variant="primary" onClick={onCheckout}>
                Оформить заказ
            </Button>

            <Button
                variant="ghost"
                icon={<TrashIcon />}
                onClick={onClear}
                disabled={clearing}
            >
                {clearing ? 'Очистка…' : 'Очистить корзину'}
            </Button>
        </aside>
    );
}

CartSummary.propTypes = {
    totalQuantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    clearing: PropTypes.bool,
    onClear: PropTypes.func.isRequired,
    onCheckout: PropTypes.func.isRequired,
};

export default CartSummary;
