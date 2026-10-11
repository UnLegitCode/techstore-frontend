import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import AdminTabs from '../../components/AdminTabs/AdminTabs';
import AdminProducts from '../../components/AdminProducts/AdminProducts';
import AdminCategories from '../../components/AdminCategories/AdminCategories';
import { useAuth } from '../../contexts/AuthContext';
import './AdminPage.css';

function AdminPage() {
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin } = useAuth();
    const [tab, setTab] = useState('products');

    const renderContent = () => {
        if (!isAuthenticated) {
            return (
                <div className="admin-notice">
                    <h2>Нужен вход</h2>
                    <p>Админ-панель доступна только авторизованным пользователям с ролью ADMIN.</p>
                    <Button variant="primary" onClick={() => navigate('/login')}>
                        Войти
                    </Button>
                </div>
            );
        }

        if (!isAdmin) {
            return (
                <div className="admin-notice admin-notice-error">
                    <h2>Недостаточно прав</h2>
                    <p>У вашей учётной записи нет роли ADMIN, поэтому управление недоступно.</p>
                    <Button variant="secondary" onClick={() => navigate('/')}>
                        На главную
                    </Button>
                </div>
            );
        }

        return (
            <>
                <AdminTabs active={tab} onChange={setTab} />
                {tab === 'products' ? <AdminProducts /> : <AdminCategories />}
            </>
        );
    };

    return (
        <>
            <Header />

            <main className="admin-page">
                <div className="admin-container">
                    <div className="admin-head">
                        <div>
                            <h1>Админ-панель</h1>
                            <p>Управление товарами и категориями магазина</p>
                        </div>
                        <button
                            type="button"
                            className="admin-back"
                            onClick={() => navigate('/')}
                        >
                            ← На главную
                        </button>
                    </div>

                    {renderContent()}
                </div>
            </main>
        </>
    );
}

export default AdminPage;
