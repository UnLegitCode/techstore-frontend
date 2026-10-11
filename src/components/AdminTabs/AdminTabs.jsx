import PropTypes from 'prop-types';
import './AdminTabs.css';

const TABS = [
    { id: 'products', label: 'Товары' },
    { id: 'categories', label: 'Категории' },
];

function AdminTabs({ active, onChange }) {
    return (
        <div className="admin-tabs" role="tablist">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active === tab.id}
                    className={`admin-tab ${active === tab.id ? 'is-active' : ''}`}
                    onClick={() => onChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

AdminTabs.propTypes = {
    active: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AdminTabs;
