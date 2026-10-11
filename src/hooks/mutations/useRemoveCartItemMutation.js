import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeItem } from '../../api/cart';

export function useRemoveCartItemMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId) => removeItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}
