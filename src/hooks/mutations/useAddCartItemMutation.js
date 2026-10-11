import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItem } from '../../api/cart';

export function useAddCartItemMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, quantity }) => addItem({ productId, quantity }),
        onSuccess: (cart) => {
            queryClient.setQueryData(['cart'], cart);
        },
    });
}