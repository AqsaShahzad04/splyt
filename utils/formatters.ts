
export const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (e) {
    // Fallback if currency code is invalid
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
};

export const parseCurrencyInput = (value: string): number => {
  // Remove non-numeric chars except decimal point
  const cleanValue = value.replace(/[^0-9.]/g, '');
  // Prevent multiple decimals
  const parts = cleanValue.split('.');
  if (parts.length > 2) {
    return parseFloat(`${parts[0]}.${parts.slice(1).join('')}`);
  }
  return parseFloat(cleanValue) || 0;
};
