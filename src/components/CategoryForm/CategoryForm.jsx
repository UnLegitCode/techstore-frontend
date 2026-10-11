import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import './CategoryForm.css';

function validate(form) {
    const title = form.title.trim();
    if (title.length < 2 || title.length > 255) {
        return 'Название: от 2 до 255 символов';
    }

    const emoji = form.emoji.trim();
    if (!emoji) {
        return 'Укажите emoji категории';
    }
    if (emoji.length > 16) {
        return 'Emoji: не длиннее 16 символов';
    }

    return '';
}

function CategoryForm({ category, submitting, error, onSubmit, onCancel }) {
    const [title, setTitle] = useState(category?.title ?? '');
    const [emoji, setEmoji] = useState(category?.emoji ?? '');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const message = validate({ title, emoji });
        if (message) {
            setValidationError(message);
            return;
        }

        setValidationError('');
        onSubmit({ title: title.trim(), emoji: emoji.trim() });
    };

    const message = validationError || (error ? error.message : '');

    return (
        <form className="category-form" onSubmit={handleSubmit} noValidate>
            <FormField id="category-title" label="Название">
                <input
                    id="category-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Смартфоны"
                />
            </FormField>

            <FormField id="category-emoji" label="Emoji">
                <input
                    id="category-emoji"
                    type="text"
                    value={emoji}
                    onChange={(event) => setEmoji(event.target.value)}
                    placeholder="📱"
                />
            </FormField>

            {message && <p className="admin-form-error">{message}</p>}

            <div className="admin-form-actions">
                <Button variant="secondary" type="button" onClick={onCancel} disabled={submitting}>
                    Отмена
                </Button>
                <Button variant="primary" type="submit" disabled={submitting}>
                    {submitting ? 'Сохранение…' : category ? 'Сохранить' : 'Создать'}
                </Button>
            </div>
        </form>
    );
}

CategoryForm.propTypes = {
    category: PropTypes.object,
    submitting: PropTypes.bool,
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default CategoryForm;
