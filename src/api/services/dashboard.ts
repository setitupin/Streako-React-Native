import { apiRequest } from '../client';
import type { DashboardSummary } from '../types';

export const getDashboardSummary = (token: string) =>
  apiRequest<DashboardSummary>('/dashboard/summary/', {
    token,
  });
