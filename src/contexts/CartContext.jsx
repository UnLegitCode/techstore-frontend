import { createContext, useContext, useState, useCallback, useRef } from 'react';
import PropTypes from "prop-types";
import { useAuth } from './AuthContext';
import { useCartQuery } from '../hooks/queries/useCartQuery';
import { useAddCartItemMutation } from '../hooks/mutations/useAddCartItemMutation';

const CartContext = createContext(null);

function truncateTitle(title) {
    return title.length > 40 ? title.slice(0, 39) + '…' : title;
}

export function CartProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const timeoutRef = useRef(null);

    const { data: cart } = useCartQuery({ enabled: isAuthenticated });
    const { mutate: addCartItem, isPending: isAdding } = useAddCartItemMutation();

    const count = isAuthenticated ? (cart?.totalQuantity ?? 0) : 0;

    const showToast = useCallback((message) => {
        clearTimeout(timeoutRef.current);
        setToastMessage(message);
        setToastVisible(true);
        timeoutRef.current = setTimeout(() => setToastVisible(false), 2200);
    }, []);

    const addToCart = useCallback((product) => {
        if (!isAuthenticated) {
            showToast('Войдите в аккаунт, чтобы добавлять товары');
            return;
        }

        addCartItem(
            { productId: product.id, quantity: 1 },
            {
                onSuccess: () => showToast(`«${truncateTitle(product.title)}» в корзине`),
                onError: (error) => showToast(error.message || 'Не удалось добавить товар'),
            }
        );
    }, [isAuthenticated, addCartItem, showToast]);

    return (
        <CartContext.Provider value={{
            count,
            addToCart,
            isAdding,
            toastMessage,
            toastVisible,
        }}>
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
