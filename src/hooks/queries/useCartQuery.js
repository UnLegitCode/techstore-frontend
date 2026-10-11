import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../api/cart';

export function useCartQuery({ enabled = true } = {}) {
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        enabled,
    });
}