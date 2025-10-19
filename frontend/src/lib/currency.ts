export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function parseAmount(value: string): number {
  const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}
