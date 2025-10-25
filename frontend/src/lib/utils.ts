import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

interface AxiosErrorResponse {
  response?: {
    data?: unknown;
  };
}

interface ErrorWithMessage {
  message: string;
}

interface ResponseData {
  message?: unknown;
  error?: unknown;
}

function isAxiosError(error: unknown): error is AxiosErrorResponse {
  return typeof error === 'object' && error !== null && 'response' in error;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === 'object' && error !== null && 'message' in error;
}

function isResponseData(data: unknown): data is ResponseData {
  return typeof data === 'object' && data !== null;
}

export function getErrorMessage(error: unknown): string {
  // Axios errors often have a `response` object with `data` containing a message.
  try {
    if (isAxiosError(error) && error.response?.data) {
      const data = error.response.data;
      if (typeof data === 'string') return data;
      if (isResponseData(data)) {
        if (data.message && typeof data.message === 'string') return data.message;
        if (data.error && typeof data.error === 'string') return data.error;
      }
    }
  } catch {
    // ignore parsing errors
  }

  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
