import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset } from '../../api/auth';

export function usePasswordResetRequestMutation() {
    return useMutation({
        mutationFn: ({ email }) => requestPasswordReset({ email }),
    });
}