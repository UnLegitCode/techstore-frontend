import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { plural } from '../utils/plural';
import PropTypes from "prop-types";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [count, setCount] = useState(0);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const timeoutRef = useRef(null);

    const showToast = useCallback((message) => {
        clearTimeout(timeoutRef.current);
        setToastMessage(message);
        setToastVisible(true);
        timeoutRef.current = setTimeout(() => setToastVisible(false), 2200);
    }, []);

    const addToCart = useCallback((product) => {
        setCount((c) => c + 1);
        const title = product.title.length > 40
            ? product.title.slice(0, 39) + '…'
            : product.title;
        showToast(`«${title}» в корзине`);
    }, [showToast]);

    const openCart = useCallback(() => {
        if (count === 0) return;
        showToast(`В корзине ${count} товар${plural(count)}`);
    }, [count, showToast]);

    return (
        <CartContext.Provider value={{ count, addToCart, openCart, toastMessage, toastVisible }}>
            {children}
        </CartContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) throw new Error('useCart must be used within <CartProvider>');

    return context;
}