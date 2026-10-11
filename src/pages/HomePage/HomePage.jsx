import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import Filters from '../../components/Filters/Filters';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Features from '../../components/Features/Features';
import Toast from '../../components/Toast/Toast';
import { useCart } from '../../contexts/CartContext';
import { useCategoriesQuery } from '../../hooks/queries/useCategoriesQuery';
import { useProductsQuery } from '../../hooks/queries/useProductsQuery';
import './HomePage.css';

function HomePage() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const catalogRef = useRef(null);
    const { addToCart, isAdding } = useCart();

    const { data: categories = [] } = useCategoriesQuery();

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search.trim()), 200);
        return () => clearTimeout(t);
    }, [search]);

    const categoryId = filter === 'all' ? undefined : filter;

    const { data: productsPage } = useProductsQuery({
        categoryId,
        search: debouncedSearch || undefined,
        page: 0,
    });

    const products = productsPage?.content ?? [];

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
                    <CategoryGrid categories={categories} onSelect={handleCategorySelect} />
                </div>
            </section>

            <section className="catalog" ref={catalogRef}>
                <div className="container">
                    <div className="section-head">
                        <h2>Популярные товары</h2>
                        <p>Хиты продаж этого месяца</p>
                    </div>

                    <Filters categories={categories} active={filter} onChange={setFilter} />

                    <ProductGrid
                        products={products}
                        getCategoryName={(category) => {
                            if (category && typeof category === 'object') {
                                return category.title;
                            }
                            const cat = categories.find((c) => c.id === category);
                            return cat ? cat.title : category;
                        }}
                        onAdd={addToCart}
                        adding={isAdding}
                    />
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <Features />
                </div>
            </section>

            <Toast />
        </>
    );
}

export default HomePage;