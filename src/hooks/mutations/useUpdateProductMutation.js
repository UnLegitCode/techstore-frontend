import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../../api/products';

export function useUpdateProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, product }) => updateProduct(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
