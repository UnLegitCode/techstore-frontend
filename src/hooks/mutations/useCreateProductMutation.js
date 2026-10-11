import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../api/products';

export function useCreateProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product) => createProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
