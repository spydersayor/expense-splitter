import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getErrorMessage(error: unknown): string {
  // Axios errors often have a `response` object with `data` containing a message.
  try {
    // @ts-ignore
    if (error?.response?.data) {
      // @ts-ignore
      const data = error.response.data;
      if (typeof data === 'string') return data;
      if (data && typeof data === 'object') {
        if ('message' in data && data.message) return String(data.message);
        if ('error' in data && data.error) return String(data.error);
      }
    }
  } catch (_) {
    // ignore parsing errors
  }

  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as any).message);
  }
  return 'An unexpected error occurred';
}
