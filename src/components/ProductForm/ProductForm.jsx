import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import './ProductForm.css';

function toFormState(product) {
    return {
        title: product?.title ?? '',
        categoryId: product?.category?.id != null ? String(product.category.id) : '',
        price: product?.price != null ? String(product.price) : '',
        previousPrice: product?.previousPrice != null ? String(product.previousPrice) : '',
        rating: product?.rating != null ? String(product.rating) : '5',
        reviews: product?.reviews != null ? String(product.reviews) : '0',
        emoji: product?.emoji ?? '',
        badge: product?.badge ?? '',
    };
}

function validate(form) {
    const title = form.title.trim();
    if (title.length < 2 || title.length > 255) {
        return 'Название: от 2 до 255 символов';
    }

    if (!form.categoryId) {
        return 'Выберите категорию';
    }

    const price = Number(form.price);
    if (form.price === '' || !Number.isFinite(price) || price < 0) {
        return 'Цена: число не меньше 0';
    }

    if (form.previousPrice !== '') {
        const previousPrice = Number(form.previousPrice);
        if (!Number.isFinite(previousPrice) || previousPrice < 0) {
            return 'Старая цена: число не меньше 0';
        }
    }

    const rating = Number(form.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return 'Рейтинг: от 1 до 5';
    }

    const reviews = Number(form.reviews);
    if (form.reviews === '' || !Number.isInteger(reviews) || reviews < 0) {
        return 'Отзывы: целое число не меньше 0';
    }

    const emoji = form.emoji.trim();
    if (!emoji) {
        return 'Укажите emoji товара';
    }
    if (emoji.length > 16) {
        return 'Emoji: не длиннее 16 символов';
    }

    if (form.badge.trim().length > 50) {
        return 'Бейдж: не длиннее 50 символов';
    }

    return '';
}

function ProductForm({ product, categories, submitting, error, onSubmit, onCancel }) {
    const [form, setForm] = useState(() => toFormState(product));
    const [validationError, setValidationError] = useState('');

    const setField = (name) => (event) => {
        const { value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const message = validate(form);
        if (message) {
            setValidationError(message);
            return;
        }

        setValidationError('');
        onSubmit({
            title: form.title.trim(),
            categoryId: Number(form.categoryId),
            price: Number(form.price),
            previousPrice: form.previousPrice === '' ? null : Number(form.previousPrice),
            rating: Number(form.rating),
            reviews: Number(form.reviews),
            emoji: form.emoji.trim(),
            badge: form.badge.trim() === '' ? null : form.badge.trim(),
        });
    };

    const message = validationError || (error ? error.message : '');

    return (
        <form className="product-form" onSubmit={handleSubmit} noValidate>
            <FormField id="product-title" label="Название">
                <input
                    id="product-title"
                    type="text"
                    value={form.title}
                    onChange={setField('title')}
                    placeholder="iPhone 15 Pro"
                />
            </FormField>

            <FormField id="product-category" label="Категория">
                <select id="product-category" value={form.categoryId} onChange={setField('categoryId')}>
                    <option value="">— выберите категорию —</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                </select>
            </FormField>

            <div className="product-form-grid">
                <FormField id="product-price" label="Цена, ₽">
                    <input
                        id="product-price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={setField('price')}
                        placeholder="999.99"
                    />
                </FormField>

                <FormField id="product-previous-price" label="Старая цена, ₽" hint="Необязательно">
                    <input
                        id="product-previous-price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.previousPrice}
                        onChange={setField('previousPrice')}
                        placeholder="1199.99"
                    />
                </FormField>

                <FormField id="product-rating" label="Рейтинг">
                    <input
                        id="product-rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={form.rating}
                        onChange={setField('rating')}
                    />
                </FormField>

                <FormField id="product-reviews" label="Отзывы">
                    <input
                        id="product-reviews"
                        type="number"
                        min="0"
                        step="1"
                        value={form.reviews}
                        onChange={setField('reviews')}
                    />
                </FormField>
            </div>

            <div className="product-form-grid">
                <FormField id="product-emoji" label="Emoji">
                    <input
                        id="product-emoji"
                        type="text"
                        value={form.emoji}
                        onChange={setField('emoji')}
                        placeholder="📱"
                    />
                </FormField>

                <FormField id="product-badge" label="Бейдж" hint="Необязательно">
                    <select id="product-badge" value={form.badge} onChange={setField('badge')}>
                        <option value="">— нет —</option>
                        <option value="sale">sale</option>
                        <option value="new">new</option>
                    </select>
                </FormField>
            </div>

            {message && <p className="admin-form-error">{message}</p>}

            <div className="admin-form-actions">
                <Button variant="secondary" type="button" onClick={onCancel} disabled={submitting}>
                    Отмена
                </Button>
                <Button variant="primary" type="submit" disabled={submitting}>
                    {submitting ? 'Сохранение…' : product ? 'Сохранить' : 'Создать'}
                </Button>
            </div>
        </form>
    );
}

ProductForm.propTypes = {
    product: PropTypes.object,
    categories: PropTypes.array.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
