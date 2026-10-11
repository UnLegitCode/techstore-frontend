import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../../api/categories';

export function useUpdateCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, category }) => updateCategory(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
