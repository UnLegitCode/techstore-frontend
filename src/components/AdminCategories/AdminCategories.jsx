import { useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import CategoryForm from '../CategoryForm/CategoryForm';
import { useCategoriesQuery } from '../../hooks/queries/useCategoriesQuery';
import { useCreateCategoryMutation } from '../../hooks/mutations/useCreateCategoryMutation';
import { useUpdateCategoryMutation } from '../../hooks/mutations/useUpdateCategoryMutation';
import { useDeleteCategoryMutation } from '../../hooks/mutations/useDeleteCategoryMutation';
import './AdminCategories.css';

function AdminCategories() {
    const [isFormOpen, setFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);

    const { data: categories = [], isLoading, isError, error } = useCategoriesQuery();

    const createCategory = useCreateCategoryMutation();
    const updateCategory = useUpdateCategoryMutation();
    const deleteCategory = useDeleteCategoryMutation();

    const submitting = createCategory.isPending || updateCategory.isPending;
    const formError = editingCategory ? updateCategory.error : createCategory.error;

    const openCreate = () => {
        createCategory.reset();
        updateCategory.reset();
        setEditingCategory(null);
        setFormOpen(true);
    };

    const openEdit = (category) => {
        createCategory.reset();
        updateCategory.reset();
        setEditingCategory(category);
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditingCategory(null);
    };

    const handleSubmit = (values) => {
        if (editingCategory) {
            updateCategory.mutate(
                { id: editingCategory.id, category: values },
                { onSuccess: closeForm }
            );
        } else {
            createCategory.mutate(values, { onSuccess: closeForm });
        }
    };

    const closeDelete = () => {
        deleteCategory.reset();
        setDeletingCategory(null);
    };

    const handleDelete = () => {
        deleteCategory.mutate(deletingCategory.id, { onSuccess: closeDelete });
    };

    return (
        <section className="admin-section">
            <div className="admin-section-head">
                <div>
                    <h2>Категории</h2>
                    <p>{categories.length} шт. всего</p>
                </div>
                <Button variant="primary" size="sm" onClick={openCreate}>
                    + Добавить категорию
                </Button>
            </div>

            {isLoading && <p className="admin-status">Загрузка категорий…</p>}
            {isError && <p className="admin-status admin-status-error">{error.message}</p>}

            {!isLoading && !isError && categories.length === 0 && (
                <p className="admin-status">Категорий пока нет.</p>
            )}

            {categories.length > 0 && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Категория</th>
                                <th>Emoji</th>
                                <th aria-label="Действия"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>
                                        <span className="admin-cell-title">{category.title}</span>
                                    </td>
                                    <td className="admin-category-emoji">{category.emoji}</td>
                                    <td>
                                        <div className="admin-row-actions">
                                            <button
                                                type="button"
                                                className="admin-action"
                                                onClick={() => openEdit(category)}
                                            >
                                                Изменить
                                            </button>
                                            <button
                                                type="button"
                                                className="admin-action admin-action-danger"
                                                onClick={() => setDeletingCategory(category)}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isFormOpen && (
                <Modal
                    title={editingCategory ? 'Изменить категорию' : 'Новая категория'}
                    onClose={closeForm}
                >
                    <CategoryForm
                        category={editingCategory}
                        submitting={submitting}
                        error={formError}
                        onSubmit={handleSubmit}
                        onCancel={closeForm}
                    />
                </Modal>
            )}

            {deletingCategory && (
                <ConfirmDialog
                    title="Удалить категорию?"
                    message={`Категория «${deletingCategory.title}» будет удалена. Если в ней есть товары, удаление не выполнится.`}
                    busy={deleteCategory.isPending}
                    error={deleteCategory.error?.message}
                    onConfirm={handleDelete}
                    onCancel={closeDelete}
                />
            )}
        </section>
    );
}

export default AdminCategories;
