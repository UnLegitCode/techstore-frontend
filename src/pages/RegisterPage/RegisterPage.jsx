import { useNavigate } from 'react-router';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';
import useRegisterValidation from '../../hooks/useRegisterValidation';
import './RegisterPage.css';
import RegisterIcon from "../../components/Icons/RegisterIcon.jsx";
import LoginIcon from "../../components/Icons/LoginIcon.jsx";
import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";

function RegisterPage() {
    const navigate = useNavigate();
    const {
        email, password, confirm,
        emailError, passwordError, confirmError,
        emailState, passwordState, confirmState,
        handleEmailChange,
        handlePasswordChange,
        handleConfirmChange,
        validateAll,
    } = useRegisterValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAll()) return;

        console.log('Register:', { email, password });
        navigate('/login');
    };

    return (
        <AuthLayout>
            <div className="register-card">
                <Logo />

                <h1>Создать аккаунт</h1>
                <p className="subtitle">Присоединяйтесь и покупайте технику выгодно</p>

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

                    <div className="form-group-with-strength">
                        <Input
                            id="password"
                            label="Пароль"
                            type="password"
                            icon="lock"
                            placeholder="Минимум 6 символов"
                            autoComplete="new-password"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                            state={passwordState}
                        />
                        <PasswordStrength password={password} />
                    </div>

                    <Input
                        id="confirmPassword"
                        label="Повторите пароль"
                        type="password"
                        icon="lock"
                        placeholder="Повторите пароль"
                        autoComplete="new-password"
                        value={confirm}
                        onChange={handleConfirmChange}
                        error={confirmError}
                        state={confirmState}
                    />

                    <Button type="submit" variant="primary" icon={<RegisterIcon />}>
                        Зарегистрироваться
                    </Button>
                </form>

                <Divider>уже есть аккаунт?</Divider>

                <Button
                    variant="secondary"
                    icon={<LoginIcon />}
                    onClick={() => navigate('/login')}
                >
                    Войти
                </Button>
            </div>
        </AuthLayout>
    );
}

export default RegisterPage;