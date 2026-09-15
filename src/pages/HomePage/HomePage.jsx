import { useState, useMemo, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import Filters from '../../components/Filters/Filters';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Features from '../../components/Features/Features';
import { products, categories } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import './HomePage.css';

function HomePage() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const catalogRef = useRef(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search.trim()), 200);
        return () => clearTimeout(t);
    }, [search]);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchCategory = filter === 'all' || p.category === filter;
            const matchSearch = !debouncedSearch ||
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [filter, debouncedSearch]);

    const getCategoryName = (id) => {
        const cat = categories.find((c) => c.id === id);
        return cat ? cat.name : id;
    };

    const handleCategorySelect = (id) => {
        setFilter(id);
        catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Header search={search} onSearchChange={setSearch} />

            <section className="categories">
                <div className="container">
                    <div className="section-head">
                        <h2>Категории</h2>
                        <p>Выберите, что вас интересует</p>
                    </div>
                    <CategoryGrid onSelect={handleCategorySelect} />
                </div>
            </section>

            <section className="catalog" ref={catalogRef}>
                <div className="container">
                    <div className="section-head">
                        <h2>Популярные товары</h2>
                        <p>Хиты продаж этого месяца</p>
                    </div>

                    <Filters active={filter} onChange={setFilter} />

                    <ProductGrid
                        products={filtered}
                        getCategoryName={getCategoryName}
                        onAdd={addToCart}
                    />
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <Features />
                </div>
            </section>
        </>
    );
}

export default HomePage;