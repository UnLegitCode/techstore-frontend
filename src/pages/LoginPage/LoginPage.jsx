import { useNavigate } from 'react-router';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
import { useAuthValidation } from '../../hooks/useAuthValidation';
import { useLoginMutation } from '../../hooks/mutations/useLoginMutation';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';
import RegisterIcon from "../../components/Icons/RegisterIcon.jsx";
import LoginIcon from "../../components/Icons/LoginIcon.jsx";
import RecoverIcon from "../../components/Icons/RecoverIcon.jsx";
import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";

function LoginPage() {
    const navigate = useNavigate();
    const { loginAuth } = useAuth();
    const {
        email,
        password,
        emailError,
        passwordError,
        emailState,
        passwordState,
        handleEmailChange: onEmailChange,
        handlePasswordChange: onPasswordChange,
        validateAll,
    } = useAuthValidation();

    const { mutateAsync, isPending, error, reset } = useLoginMutation();

    const handleEmailChange = (value) => {
        reset();
        onEmailChange(value);
    };

    const handlePasswordChange = (value) => {
        reset();
        onPasswordChange(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        reset();

        if (!validateAll()) return;

        try {
            const auth = await mutateAsync({ email, password });
            loginAuth(auth);
            navigate('/');
        } catch {
            // ошибка отображается из состояния мутации
        }
    };

    return (
        <AuthLayout>
            <div className="login-card">
                <Logo />

                <h1>Вход в аккаунт</h1>
                <p className="subtitle">Рады видеть вас снова в TechStore</p>

                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        icon="mail"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        state={emailState}
                    />

                    <Input
                        id="password"
                        label="Пароль"
                        type="password"
                        icon="lock"
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        state={passwordState}
                    />

                    {error && <div className="form-error">{error.message}</div>}

                    <Button
                        type="submit"
                        variant="primary"
                        icon={<LoginIcon />}
                        disabled={isPending}
                    >
                        {isPending ? 'Вход…' : 'Войти'}
                    </Button>
                </form>

                <Divider>нет аккаунта?</Divider>

                <Button
                    variant="secondary"
                    icon={<RegisterIcon />}
                    onClick={() => navigate('/register')}
                >
                    Зарегистрироваться
                </Button>

                <Button
                    variant="ghost"
                    icon={<RecoverIcon />}
                    onClick={() => navigate('/recover')}
                >
                    Восстановить пароль
                </Button>
            </div>
        </AuthLayout>
    );
}

export default LoginPage;