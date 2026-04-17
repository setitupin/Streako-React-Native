import { apiRequest } from '../client';
import type {
  AuthUser,
  HealthCheckResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '../types';

export const login = (payload: LoginPayload) =>
  apiRequest<LoginResponse>('/auth/login/', {
    method: 'POST',
    body: payload,
  });

export const register = (payload: RegisterPayload) =>
  apiRequest<RegisterResponse>('/auth/register/', {
    method: 'POST',
    body: payload,
  });

export const getCurrentProfile = (token: string) =>
  apiRequest<AuthUser>('/auth/me/', {
    token,
  });

export const getHealthCheck = () =>
  apiRequest<HealthCheckResponse>('/dashboard/health/');
