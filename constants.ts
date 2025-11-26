
export const TIP_OPTIONS = [10, 15, 18, 20, 25];

export const MAX_SPLIT = 20;
export const MIN_SPLIT = 1;

export const MAX_BILL_INPUT = 99999.99;

export const THEME_COLORS = {
  activeButton: "bg-primary-teal",
  activeText: "text-primary-teal",
  hoverButton: "hover:bg-primary-lightTeal",
};

export const CURRENCIES = [
  // Default
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  
  // European (Top Priority)
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'CHF', symbol: 'Fr', label: 'Swiss Franc' },
  { code: 'SEK', symbol: 'kr', label: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', label: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', label: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', label: 'Polish Złoty' },
  { code: 'CZK', symbol: 'Kč', label: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', label: 'Hungarian Forint' },
  { code: 'ISK', symbol: 'kr', label: 'Icelandic Króna' },
  { code: 'RON', symbol: 'lei', label: 'Romanian Leu' },
  { code: 'BGN', symbol: 'лв', label: 'Bulgarian Lev' },
  { code: 'TRY', symbol: '₺', label: 'Turkish Lira' },
  
  // Rest of World
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'CNY', symbol: '¥', label: 'Chinese Yuan' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
  { code: 'NZD', symbol: 'NZ$', label: 'New Zealand Dollar' },
  { code: 'MXN', symbol: '$', label: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', label: 'South African Rand' },
  { code: 'KRW', symbol: '₩', label: 'South Korean Won' },
  { code: 'RUB', symbol: '₽', label: 'Russian Ruble' },
  { code: 'SAR', symbol: '﷼', label: 'Saudi Riyal' },
  { code: 'AED', symbol: 'dh', label: 'UAE Dirham' },
  { code: 'THB', symbol: '฿', label: 'Thai Baht' },
  { code: 'VND', symbol: '₫', label: 'Vietnamese Dong' },
  { code: 'IDR', symbol: 'Rp', label: 'Indonesian Rupiah' },
  { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit' },
  { code: 'PHP', symbol: '₱', label: 'Philippine Peso' },
];
