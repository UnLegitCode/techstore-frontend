import './Features.css';
import TruckIcon from "../Icons/TruckIcon.jsx";
import ShieldIcon from "../Icons/ShieldIcon.jsx";
import ReturnIcon from "../Icons/ReturnIcon.jsx";
import PriceIcon from "../Icons/PriceIcon.jsx";

const FEATURES = [
    {Icon: TruckIcon, title: 'Быстрая доставка', text: 'По всей стране за 1–3 дня'},
    {Icon: ShieldIcon, title: 'Гарантия 2 года', text: 'Официальная гарантия на всю технику'},
    {Icon: ReturnIcon, title: 'Возврат 14 дней', text: 'Без вопросов и лишних формальностей'},
    {Icon: PriceIcon, title: 'Выгодные цены', text: 'Регулярные акции и рассрочка 0%'},
];

function Features() {
    return (
        <div className="feature-grid">
            {FEATURES.map(({Icon, title, text}) => (
                <div className="feature" key={title}>
                    <div className="feature-icon"><Icon/></div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
            ))}
        </div>
    );
}

Features.propTypes = {}

export default Features;