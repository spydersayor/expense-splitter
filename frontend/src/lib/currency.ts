// This file is kept for backward compatibility
// The main currency formatting is now done via useCurrency hook

export function formatCurrency(amount: number, currencyCode: string = 'INR', locale: string = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export function parseAmount(value: string): number {
  const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}
