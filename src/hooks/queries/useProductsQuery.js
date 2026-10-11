import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/products';

export function useProductsQuery({ categoryId, search, page, minPrice, maxPrice, minRating, badge } = {}) {
    const params = { categoryId, search, page, minPrice, maxPrice, minRating, badge };

    Object.keys(params).forEach((key) => {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
            delete params[key];
        }
    });

    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
        keepPreviousData: true,
    });
}