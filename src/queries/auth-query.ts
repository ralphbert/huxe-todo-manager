import { useMutation } from '@tanstack/vue-query';
import type { AuthPayload } from '@/types';
import { getUser, login } from '@/api/auth-requests';

export function useLoginMutation() {
  return useMutation((payload: AuthPayload) => {
    return login(payload);
  });
}

export function sendIsAuthenticationRequest(): Promise<boolean> {
  return getUser()
    .then(() => true)
    .catch(() => false);
}
