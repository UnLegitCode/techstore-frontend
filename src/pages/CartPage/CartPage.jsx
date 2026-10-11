import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import CartList from '../../components/CartList/CartList';
import CartSummary from '../../components/CartSummary/CartSummary';
import EmptyCart from '../../components/EmptyCart/EmptyCart';
import { useAuth } from '../../contexts/AuthContext';
import { useCartQuery } from '../../hooks/queries/useCartQuery';
import { useUpdateCartItemMutation } from '../../hooks/mutations/useUpdateCartItemMutation';
import { useRemoveCartItemMutation } from '../../hooks/mutations/useRemoveCartItemMutation';
import { useClearCartMutation } from '../../hooks/mutations/useClearCartMutation';
import './CartPage.css';

function CartPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { data: cart, isLoading, isError, error } = useCartQuery({ enabled: isAuthenticated });
    const updateItem = useUpdateCartItemMutation();
    const removeItem = useRemoveCartItemMutation();
    const clearCart = useClearCartMutation();

    const items = cart?.items ?? [];
    const busy = updateItem.isPending || removeItem.isPending || clearCart.isPending;
    const actionError = updateItem.error || removeItem.error || clearCart.error;

    const renderContent = () => {
        if (!isAuthenticated) {
            return (
                <EmptyCart
                    title="Войдите в аккаунт"
                    message="Корзина доступна авторизованным пользователям. Войдите или зарегистрируйтесь, чтобы продолжить."
                    actionLabel="Войти"
                    onAction={() => navigate('/login')}
                />
            );
        }

        if (isLoading) {
            return <p className="cart-status">Загрузка корзины…</p>;
        }

        if (isError) {
            return <p className="cart-status cart-status-error">{error.message}</p>;
        }

        if (items.length === 0) {
            return (
                <EmptyCart
                    title="Корзина пуста"
                    message="Добавьте товары из каталога, чтобы оформить заказ."
                    actionLabel="Перейти в каталог"
                    onAction={() => navigate('/')}
                />
            );
        }

        return (
            <div className="cart-layout">
                <CartList
                    items={items}
                    busy={busy}
                    onQuantityChange={(itemId, quantity) => updateItem.mutate({ itemId, quantity })}
                    onRemove={(itemId) => removeItem.mutate(itemId)}
                />

                <CartSummary
                    totalQuantity={cart.totalQuantity}
                    totalPrice={cart.totalPrice}
                    clearing={clearCart.isPending}
                    onClear={() => clearCart.mutate()}
                    onCheckout={() => undefined}
                />
            </div>
        );
    };

    return (
        <>
            <Header />

            <main className="cart-page">
                <div className="cart-container">
                    <div className="cart-head">
                        <h1>Корзина</h1>
                    </div>

                    {actionError && (
                        <p className="cart-status cart-status-error">{actionError.message}</p>
                    )}

                    {renderContent()}
                </div>
            </main>
        </>
    );
}

export default CartPage;
