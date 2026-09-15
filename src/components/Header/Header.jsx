import { Link, useNavigate } from 'react-router';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import { useCart } from '../../contexts/CartContext';
import './Header.css';
import CartIcon from "../Icons/CartIcon.jsx";
import SearchIcon from "../Icons/SearchIcon.jsx";
import PropTypes from "prop-types";

function Header({ search, onSearchChange }) {
    const navigate = useNavigate();
    const { count, openCart } = useCart();

    return (
        <header className="header">
            <div className="container header-inner">
                <Link to="/" className="logo-link">
                    <Logo />
                </Link>

                <div className="search">
                    <span className="search-icon"><SearchIcon /></span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Поиск товаров…"
                    />
                </div>

                <nav className="header-actions">
                    <button className="icon-btn" onClick={openCart} aria-label="Корзина">
                        <CartIcon />
                        <span className="cart-badge">{count}</span>
                    </button>
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
                </nav>
            </div>
        </header>
    );
}

Headers.propTypes = {
    active: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Header;