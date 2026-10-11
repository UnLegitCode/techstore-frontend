import { useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import ProductForm from '../ProductForm/ProductForm';
import { formatters } from '../../utils/formatters';
import { useCategoriesQuery } from '../../hooks/queries/useCategoriesQuery';
import { useProductsQuery } from '../../hooks/queries/useProductsQuery';
import { useCreateProductMutation } from '../../hooks/mutations/useCreateProductMutation';
import { useUpdateProductMutation } from '../../hooks/mutations/useUpdateProductMutation';
import { useDeleteProductMutation } from '../../hooks/mutations/useDeleteProductMutation';
import './AdminProducts.css';

function AdminProducts() {
    const [page, setPage] = useState(0);
    const [isFormOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data, isLoading, isError, error } = useProductsQuery({ page });
    const { data: categories = [] } = useCategoriesQuery();

    const createProduct = useCreateProductMutation();
    const updateProduct = useUpdateProductMutation();
    const deleteProduct = useDeleteProductMutation();

    const products = data?.content ?? [];
    const pageInfo = data?.page;
    const submitting = createProduct.isPending || updateProduct.isPending;
    const formError = editingProduct ? updateProduct.error : createProduct.error;

    const openCreate = () => {
        createProduct.reset();
        updateProduct.reset();
        setEditingProduct(null);
        setFormOpen(true);
    };

    const openEdit = (product) => {
        createProduct.reset();
        updateProduct.reset();
        setEditingProduct(product);
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = (values) => {
        if (editingProduct) {
            updateProduct.mutate(
                { id: editingProduct.id, product: values },
                { onSuccess: closeForm }
            );
        } else {
            createProduct.mutate(values, { onSuccess: closeForm });
        }
    };

    const closeDelete = () => {
        deleteProduct.reset();
        setDeletingProduct(null);
    };

    const handleDelete = () => {
        deleteProduct.mutate(deletingProduct.id, { onSuccess: closeDelete });
    };

    return (
        <section className="admin-section">
            <div className="admin-section-head">
                <div>
                    <h2>Товары</h2>
                    {pageInfo && <p>{pageInfo.totalElements} шт. всего</p>}
                </div>
                <Button variant="primary" size="sm" onClick={openCreate}>
                    + Добавить товар
                </Button>
            </div>

            {isLoading && <p className="admin-status">Загрузка товаров…</p>}
            {isError && <p className="admin-status admin-status-error">{error.message}</p>}

            {!isLoading && !isError && products.length === 0 && (
                <p className="admin-status">Товаров пока нет.</p>
            )}

            {products.length > 0 && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Категория</th>
                                <th>Цена</th>
                                <th>Рейтинг</th>
                                <th>Бейдж</th>
                                <th aria-label="Действия"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="admin-product-cell">
                                            <span className="admin-product-emoji">{product.emoji}</span>
                                            <span className="admin-cell-title">{product.title}</span>
                                        </div>
                                    </td>
                                    <td>{product.category?.title ?? '—'}</td>
                                    <td>{formatters(product.price)}</td>
                                    <td>{product.rating} · {product.reviews}</td>
                                    <td>
                                        {product.badge
                                            ? <span className="admin-badge">{product.badge}</span>
                                            : '—'}
                                    </td>
                                    <td>
                                        <div className="admin-row-actions">
                                            <button
                                                type="button"
                                                className="admin-action"
                                                onClick={() => openEdit(product)}
                                            >
                                                Изменить
                                            </button>
                                            <button
                                                type="button"
                                                className="admin-action admin-action-danger"
                                                onClick={() => setDeletingProduct(product)}
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

            {pageInfo && pageInfo.totalPages > 1 && (
                <div className="admin-pagination">
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                        disabled={page <= 0}
                    >
                        ← Назад
                    </button>
                    <span>Страница {page + 1} из {pageInfo.totalPages}</span>
                    <button
                        type="button"
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page + 1 >= pageInfo.totalPages}
                    >
                        Вперёд →
                    </button>
                </div>
            )}

            {isFormOpen && (
                <Modal
                    title={editingProduct ? 'Изменить товар' : 'Новый товар'}
                    onClose={closeForm}
                >
                    <ProductForm
                        product={editingProduct}
                        categories={categories}
                        submitting={submitting}
                        error={formError}
                        onSubmit={handleSubmit}
                        onCancel={closeForm}
                    />
                </Modal>
            )}

            {deletingProduct && (
                <ConfirmDialog
                    title="Удалить товар?"
                    message={`Товар «${deletingProduct.title}» будет удалён без возможности восстановления.`}
                    busy={deleteProduct.isPending}
                    error={deleteProduct.error?.message}
                    onConfirm={handleDelete}
                    onCancel={closeDelete}
                />
            )}
        </section>
    );
}

export default AdminProducts;
