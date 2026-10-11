import { Link, useNavigate } from 'react-router';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';
import CartIcon from "../Icons/CartIcon.jsx";
import SearchIcon from "../Icons/SearchIcon.jsx";
import UserIcon from "../Icons/UserIcon.jsx";
import PropTypes from "prop-types";

function Header({ search = '', onSearchChange }) {
    const navigate = useNavigate();
    const { count } = useCart();
    const { isAuthenticated, isAdmin, email, logoutAuth } = useAuth();

    return (
        <header className="header">
            <div className="container header-inner">
                <Link to="/" className="logo-link">
                    <Logo />
                </Link>

                {onSearchChange && (
                    <div className="search">
                        <span className="search-icon"><SearchIcon /></span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Поиск товаров…"
                        />
                    </div>
                )}

                <nav className="header-actions">
                    <button
                        className="icon-btn"
                        onClick={() => navigate('/cart')}
                        aria-label="Корзина"
                    >
                        <CartIcon />
                        <span className="cart-badge">{count}</span>
                    </button>

                    {isAdmin && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate('/admin')}
                        >
                            Админ-панель
                        </Button>
                    )}

                    {isAuthenticated ? (
                        <div className="account">
                            <span className="account-chip" title={email || undefined}>
                                <UserIcon />
                                <span className="account-email">{email}</span>
                            </span>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={logoutAuth}
                            >
                                Выйти
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => navigate('/login')}
                            >
                                Войти
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => navigate('/register')}
                            >
                                Регистрация
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

Header.propTypes = {
    search: PropTypes.string,
    onSearchChange: PropTypes.func,
};

export default Header;