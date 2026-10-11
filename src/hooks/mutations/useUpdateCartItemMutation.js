import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItemQuantity } from '../../api/cart';

export function useUpdateCartItemMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ itemId, quantity }) => updateItemQuantity(itemId, quantity),
        onSuccess: (cart) => {
            queryClient.setQueryData(['cart'], cart);
        },
    });
}
