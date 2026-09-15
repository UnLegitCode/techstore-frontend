import { useState } from 'react';
import { useNavigate } from 'react-router';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import useEmailValidation from '../../hooks/useEmailValidation';
import './RecoverPage.css';
import MailSendIcon from "../../components/Icons/MailSendIcon.jsx";
import LoginIcon from "../../components/Icons/LoginIcon.jsx";
import AuthLayout from "../../components/AuthLayout/AuthLayout.jsx";

function RecoverPage() {
    const navigate = useNavigate();
    const {
        value: email,
        error: emailError,
        state: emailState,
        handleChange: handleEmailChange,
        validateAll,
    } = useEmailValidation();

    const [sentTo, setSentTo] = useState(null);
    const [sending, setSending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSentTo(null);

        if (!validateAll()) return;

        setSending(true);
        try {
            await new Promise((r) => setTimeout(r, 1200));

            setSentTo(email);
        } finally {
            setSending(false);
        }
    };

    return (
        <AuthLayout>
            <div className="recover-card">
                <Logo />

                <h1>Восстановление пароля</h1>
                <p className="subtitle">
                    Укажите email, привязанный к аккаунту, — мы отправим ссылку для сброса пароля
                </p>

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

                    <Button
                        type="submit"
                        variant="primary"
                        icon={<MailSendIcon />}
                        disabled={sending}
                    >
                        {sending ? 'Отправка…' : 'Отправить ссылку'}
                    </Button>
                </form>

                {sentTo && <SuccessMessage email={sentTo} />}

                <Divider>вспомнили пароль?</Divider>

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

export default RecoverPage;