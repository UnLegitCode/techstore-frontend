import { useNavigate } from 'react-router';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
import './NotFoundPage.css';
import LoginIcon from "../../components/Icons/LoginIcon.jsx";

function HomeIcon() {
    return null;
}

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <div className="notfound-card">
                <Logo />

                <div className="notfound-code">
                    <span className="digit">4</span>
                    <span className="zero">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <span className="digit">4</span>
                </div>

                <h1>Страница не найдена</h1>
                <p className="subtitle">
                    Похоже, такой страницы не существует или она была перемещена.
                    Проверьте адрес или вернитесь на главную.
                </p>

                <Button
                    variant="primary"
                    icon={<HomeIcon />}
                    onClick={() => navigate('/')}
                >
                    На главную
                </Button>

                <Divider>или</Divider>

                <Button
                    variant="secondary"
                    icon={<LoginIcon />}
                    onClick={() => navigate('/login')}
                >
                    Войти в аккаунт
                </Button>

                <p className="footer-hint">
                    Код ошибки: <code>404</code>
                </p>
            </div>
        </AuthLayout>
    );
}

export default NotFoundPage;