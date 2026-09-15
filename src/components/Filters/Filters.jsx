import { categories } from '../../data/products';
import './Filters.css';

function Filters({ active, onChange }) {
    const chips = [{ id: 'all', name: 'Все' }, ...categories];

    return (
        <div className="filters">
            {chips.map((chip) => (
                <button
                    key={chip.id}
                    type="button"
                    className={`filter-chip ${active === chip.id ? 'active' : ''}`}
                    onClick={() => onChange(chip.id)}
                >
                    {chip.name}
                </button>
            ))}
        </div>
    );
}

export default Filters;