import type { AuthPayload, AuthResponse, User } from '@/types';
import { httpClient } from '@/api/http-client';

export function login(payload: AuthPayload) {
  return httpClient.post<AuthResponse>('auth/local', payload);
}

export function getUser() {
  return httpClient.get<User>('users/me');
}
