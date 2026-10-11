import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../api/products';

export function useDeleteProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
