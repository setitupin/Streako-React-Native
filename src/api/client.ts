import { Platform } from 'react-native';

type QueryValue = string | number | boolean | null | undefined;

interface ApiRequestOptions {
  body?: unknown;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, QueryValue>;
  token?: string | null;
}

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const getDefaultApiBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000/api';
  }

  return 'http://127.0.0.1:8000/api';
};

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || getDefaultApiBaseUrl();

const buildUrl = (path: string, query?: Record<string, QueryValue>) => {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const getErrorMessage = (status: number, payload: unknown) => {
  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const detail = (payload as { detail?: unknown }).detail;
    if (typeof detail === 'string' && detail.trim()) {
      return detail;
    }

    const firstEntry = Object.entries(payload as Record<string, unknown>)[0];
    if (firstEntry) {
      const [, value] = firstEntry;
      if (Array.isArray(value) && typeof value[0] === 'string') {
        return value[0];
      }
      if (typeof value === 'string') {
        return value;
      }
    }
  }

  return `Request failed with status ${status}`;
};

export const apiRequest = async <T>(
  path: string,
  { body, headers, method = 'GET', query, token }: ApiRequestOptions = {},
): Promise<T> => {
  const response = await fetch(buildUrl(path, query), {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const rawText = await response.text();
  const payload = rawText ? tryParseJson(rawText) : null;

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(response.status, payload),
      response.status,
      payload,
    );
  }

  return payload as T;
};

const tryParseJson = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
