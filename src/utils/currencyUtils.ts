/**
 * Currency & Tuition Helper for Global Universities
 * Maps country codes and country names to official currencies and realistic local tuition ranges.
 * Features live Forex Exchange Rate API integration converting destination currencies to Indian Rupees (₹ INR).
 */

export interface CurrencyInfo {
  code: string;
  symbol: string;
  prefix: string;
  name: string;
}

export interface ForexRatesMap {
  [currencyCode: string]: number; // Value in INR per 1 unit of foreign currency
}

// Fallback rates (1 Foreign Currency = X INR)
export const DEFAULT_INR_RATES: ForexRatesMap = {
  USD: 86.80,
  GBP: 109.80,
  EUR: 94.30,
  CAD: 61.50,
  AUD: 55.60,
  NZD: 50.80,
  AED: 23.63,
  CHF: 96.50,
  JPY: 0.57,
  KRW: 0.061,
  SGD: 64.20,
  MYR: 19.50,
  HKD: 11.12,
  CNY: 11.90,
  SEK: 8.20,
  DKK: 12.65,
  PLN: 21.80,
  CZK: 3.75,
  HUF: 0.23,
  INR: 1.00,
};

let cachedLiveRates: ForexRatesMap = { ...DEFAULT_INR_RATES };
let lastFetchedTime: number = 0;

/**
 * Fetches live exchange rates relative to USD and calculates INR cross-rates.
 * Caches in localStorage for 12 hours (daily updates).
 */
export async function fetchLiveForexRates(): Promise<{ rates: ForexRatesMap; isLive: boolean; updatedDate: string }> {
  const CACHE_KEY = 'tasa_forex_rates_v1';
  const CACHE_TIME_KEY = 'tasa_forex_timestamp_v1';
  const TWELVE_HOURS = 12 * 60 * 60 * 1000;

  try {
    const savedRates = localStorage.getItem(CACHE_KEY);
    const savedTime = localStorage.getItem(CACHE_TIME_KEY);

    if (savedRates && savedTime && (Date.now() - Number(savedTime) < TWELVE_HOURS)) {
      const parsed = JSON.parse(savedRates);
      cachedLiveRates = { ...DEFAULT_INR_RATES, ...parsed };
      return { 
        rates: cachedLiveRates, 
        isLive: true, 
        updatedDate: new Date(Number(savedTime)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) 
      };
    }

    // Fetch from Open Exchange Rates endpoint
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.INR) {
        const usdInr = data.rates.INR; // e.g. 86.8
        const computedRates: ForexRatesMap = {};

        // Convert USD-base rates to INR per 1 foreign currency unit
        Object.keys(data.rates).forEach((curr) => {
          const rateVsUsd = data.rates[curr]; // units of CURR per 1 USD
          if (rateVsUsd > 0) {
            computedRates[curr] = usdInr / rateVsUsd;
          }
        });

        cachedLiveRates = { ...DEFAULT_INR_RATES, ...computedRates };
        lastFetchedTime = Date.now();
        localStorage.setItem(CACHE_KEY, JSON.stringify(computedRates));
        localStorage.setItem(CACHE_TIME_KEY, String(lastFetchedTime));

        return {
          rates: cachedLiveRates,
          isLive: true,
          updatedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
        };
      }
    }
  } catch (err) {
    console.warn('Forex API fetch fallback to default rates:', err);
  }

  return {
    rates: cachedLiveRates,
    isLive: false,
    updatedDate: 'Live Spot Estimation'
  };
}

export function getCachedRates(): ForexRatesMap {
  return cachedLiveRates;
}

/**
 * Extracts numbers from a tuition string and converts to Lakhs INR (₹ L)
 */
export function formatTuitionInINR(
  tuitionStr: string, 
  countryCodeOrName?: string, 
  customRates?: ForexRatesMap
): { inrText: string; lakhsRange: string } {
  const rates = customRates || cachedLiveRates;
  const currencyInfo = getCountryCurrencyInfo(countryCodeOrName);
  const code = currencyInfo.code;
  const rateToINR = rates[code] || DEFAULT_INR_RATES[code] || 86.8;

  // Extract all numeric sequences (e.g., "18,000 - 28,000")
  const cleanStr = tuitionStr.replace(/,/g, '');
  const matches = cleanStr.match(/\d+(\.\d+)?/g);

  if (!matches || matches.length === 0) {
    return { inrText: 'Approx. ₹12L - ₹25L / yr', lakhsRange: '₹12L - ₹25L' };
  }

  const nums = matches.map(m => parseFloat(m));
  
  if (nums.length === 1) {
    const inrValue = nums[0] * rateToINR;
    const lakhs = (inrValue / 100000).toFixed(1);
    return {
      inrText: `₹${lakhs} Lakhs / yr`,
      lakhsRange: `₹${lakhs}L`
    };
  }

  const minInr = (nums[0] * rateToINR) / 100000;
  const maxInr = (nums[1] * rateToINR) / 100000;

  // Formatting lakhs cleanly
  const minText = minInr < 1 ? `₹${(nums[0] * rateToINR / 1000).toFixed(0)}k` : `₹${minInr.toFixed(1)}L`;
  const maxText = maxInr < 1 ? `₹${(nums[1] * rateToINR / 1000).toFixed(0)}k` : `₹${maxInr.toFixed(1)}L`;

  return {
    inrText: `${minText} - ${maxText} / yr`,
    lakhsRange: `${minText} - ${maxText}`
  };
}

export function getCountryCurrencyInfo(countryCodeOrName?: string): CurrencyInfo {
  const c = (countryCodeOrName || '').toUpperCase().trim();

  // USA
  if (c === 'US' || c === 'USA' || c.includes('UNITED STATES') || c.includes('AMERICA')) {
    return { code: 'USD', symbol: '$', prefix: '$', name: 'US Dollar' };
  }
  // UK
  if (c === 'UK' || c === 'GB' || c.includes('UNITED KINGDOM') || c.includes('ENGLAND') || c.includes('SCOTLAND') || c.includes('WALES')) {
    return { code: 'GBP', symbol: '£', prefix: '£', name: 'British Pound' };
  }
  // Canada
  if (c === 'CA' || c === 'CAN' || c.includes('CANADA')) {
    return { code: 'CAD', symbol: '$', prefix: 'CAD $', name: 'Canadian Dollar' };
  }
  // Australia
  if (c === 'AU' || c === 'AUS' || c.includes('AUSTRALIA')) {
    return { code: 'AUD', symbol: '$', prefix: 'AUD $', name: 'Australian Dollar' };
  }
  // New Zealand
  if (c === 'NZ' || c === 'NZL' || c.includes('NEW ZEALAND')) {
    return { code: 'NZD', symbol: '$', prefix: 'NZD $', name: 'New Zealand Dollar' };
  }
  // Germany
  if (c === 'DE' || c.includes('GERMANY') || c.includes('DEUTSCHLAND')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // France
  if (c === 'FR' || c.includes('FRANCE')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Ireland
  if (c === 'IE' || c.includes('IRELAND')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Netherlands
  if (c === 'NL' || c.includes('NETHERLANDS') || c.includes('HOLLAND')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Italy
  if (c === 'IT' || c.includes('ITALY')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Spain
  if (c === 'ES' || c.includes('SPAIN')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Finland
  if (c === 'FI' || c.includes('FINLAND')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Austria
  if (c === 'AT' || c.includes('AUSTRIA')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Belgium
  if (c === 'BE' || c.includes('BELGIUM')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Portugal
  if (c === 'PT' || c.includes('PORTUGAL')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Greece
  if (c === 'GR' || c.includes('GREECE')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Cyprus
  if (c === 'CY' || c.includes('CYPRUS')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Malta
  if (c === 'MT' || c.includes('MALTA')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Latvia
  if (c === 'LV' || c.includes('LATVIA')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Lithuania
  if (c === 'LT' || c.includes('LITHUANIA')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Slovenia
  if (c === 'SI' || c.includes('SLOVENIA')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Croatia
  if (c === 'HR' || c.includes('CROATIA')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Bulgaria
  if (c === 'BG' || c.includes('BULGARIA')) {
    return { code: 'EUR', symbol: '€', prefix: '€', name: 'Euro' };
  }
  // Switzerland
  if (c === 'CH' || c.includes('SWITZERLAND') || c.includes('SWISS')) {
    return { code: 'CHF', symbol: 'CHF', prefix: 'CHF ', name: 'Swiss Franc' };
  }
  // Sweden
  if (c === 'SE' || c.includes('SWEDEN')) {
    return { code: 'SEK', symbol: 'SEK', prefix: 'SEK ', name: 'Swedish Krona' };
  }
  // Denmark
  if (c === 'DK' || c.includes('DENMARK')) {
    return { code: 'DKK', symbol: 'DKK', prefix: 'DKK ', name: 'Danish Krone' };
  }
  // Poland
  if (c === 'PL' || c.includes('POLAND')) {
    return { code: 'PLN', symbol: 'PLN', prefix: 'PLN ', name: 'Polish Zloty' };
  }
  // Czech Republic
  if (c === 'CZ' || c.includes('CZECH')) {
    return { code: 'CZK', symbol: 'CZK', prefix: 'CZK ', name: 'Czech Koruna' };
  }
  // Hungary
  if (c === 'HU' || c.includes('HUNGARY')) {
    return { code: 'HUF', symbol: 'HUF', prefix: 'HUF ', name: 'Hungarian Forint' };
  }
  // UAE / Dubai
  if (c === 'AE' || c.includes('UAE') || c.includes('DUBAI') || c.includes('EMIRATES')) {
    return { code: 'AED', symbol: 'AED', prefix: 'AED ', name: 'UAE Dirham' };
  }
  // Saudi Arabia
  if (c === 'SA' || c.includes('SAUDI')) {
    return { code: 'SAR', symbol: 'SAR', prefix: 'SAR ', name: 'Saudi Riyal' };
  }
  // Singapore
  if (c === 'SG' || c.includes('SINGAPORE')) {
    return { code: 'SGD', symbol: '$', prefix: 'SGD $', name: 'Singapore Dollar' };
  }
  // Japan
  if (c === 'JP' || c.includes('JAPAN')) {
    return { code: 'JPY', symbol: '¥', prefix: 'JPY ¥', name: 'Japanese Yen' };
  }
  // South Korea
  if (c === 'KR' || c.includes('KOREA')) {
    return { code: 'KRW', symbol: '₩', prefix: 'KRW ₩', name: 'South Korean Won' };
  }
  // Malaysia
  if (c === 'MY' || c.includes('MALAYSIA')) {
    return { code: 'MYR', symbol: 'RM', prefix: 'RM ', name: 'Malaysian Ringgit' };
  }
  // Hong Kong
  if (c === 'HK' || c.includes('HONG KONG')) {
    return { code: 'HKD', symbol: '$', prefix: 'HKD $', name: 'Hong Kong Dollar' };
  }
  // China
  if (c === 'CN' || c.includes('CHINA')) {
    return { code: 'CNY', symbol: '¥', prefix: 'RMB ¥', name: 'Chinese Yuan' };
  }
  // India
  if (c === 'IN' || c.includes('INDIA')) {
    return { code: 'INR', symbol: '₹', prefix: '₹', name: 'Indian Rupee' };
  }

  return { code: 'USD', symbol: '$', prefix: '$', name: 'US Dollar' };
}

export function getCountryTuitionRange(
  countryCodeOrName?: string,
  tier: 'Budget' | 'Moderate' | 'Premium' = 'Moderate'
): string {
  const c = (countryCodeOrName || '').toUpperCase().trim();

  // 1. USA
  if (c === 'US' || c === 'USA' || c.includes('UNITED STATES') || c.includes('AMERICA')) {
    if (tier === 'Budget') return '$12,000 - $18,000 / yr';
    if (tier === 'Premium') return '$28,000 - $45,000+ / yr';
    return '$18,000 - $28,000 / yr';
  }

  // 2. UK
  if (c === 'UK' || c === 'GB' || c.includes('UNITED KINGDOM') || c.includes('ENGLAND') || c.includes('SCOTLAND') || c.includes('WALES')) {
    if (tier === 'Budget') return '£10,000 - £15,000 / yr';
    if (tier === 'Premium') return '£22,000 - £35,000+ / yr';
    return '£15,000 - £22,000 / yr';
  }

  // 3. Canada
  if (c === 'CA' || c === 'CAN' || c.includes('CANADA')) {
    if (tier === 'Budget') return 'CAD 14,000 - 20,000 / yr';
    if (tier === 'Premium') return 'CAD 30,000 - 42,000+ / yr';
    return 'CAD 20,000 - 30,000 / yr';
  }

  // 4. Australia
  if (c === 'AU' || c === 'AUS' || c.includes('AUSTRALIA')) {
    if (tier === 'Budget') return 'AUD 18,000 - 26,000 / yr';
    if (tier === 'Premium') return 'AUD 36,000 - 48,000+ / yr';
    return 'AUD 26,000 - 36,000 / yr';
  }

  // 5. New Zealand
  if (c === 'NZ' || c === 'NZL' || c.includes('NEW ZEALAND')) {
    if (tier === 'Budget') return 'NZD 18,000 - 25,000 / yr';
    if (tier === 'Premium') return 'NZD 34,000 - 45,000+ / yr';
    return 'NZD 25,000 - 34,000 / yr';
  }

  // 6. Germany
  if (c === 'DE' || c.includes('GERMANY') || c.includes('DEUTSCHLAND')) {
    if (tier === 'Budget') return '€0 - €1,500 / yr (Public)';
    if (tier === 'Premium') return '€8,000 - €16,000 / yr';
    return '€2,000 - €6,000 / yr';
  }

  // 7. France
  if (c === 'FR' || c.includes('FRANCE')) {
    if (tier === 'Budget') return '€2,800 - €5,000 / yr';
    if (tier === 'Premium') return '€12,000 - €22,000 / yr';
    return '€6,000 - €12,000 / yr';
  }

  // 8. Ireland
  if (c === 'IE' || c.includes('IRELAND')) {
    if (tier === 'Budget') return '€9,500 - €13,000 / yr';
    if (tier === 'Premium') return '€18,000 - €26,000 / yr';
    return '€13,000 - €18,000 / yr';
  }

  // 9. Netherlands
  if (c === 'NL' || c.includes('NETHERLANDS') || c.includes('HOLLAND')) {
    if (tier === 'Budget') return '€8,000 - €12,000 / yr';
    if (tier === 'Premium') return '€16,000 - €24,000 / yr';
    return '€12,000 - €16,000 / yr';
  }

  // 10. Italy
  if (c === 'IT' || c.includes('ITALY')) {
    if (tier === 'Budget') return '€1,000 - €4,000 / yr';
    if (tier === 'Premium') return '€9,000 - €16,000 / yr';
    return '€4,000 - €9,000 / yr';
  }

  // 11. Spain
  if (c === 'ES' || c.includes('SPAIN')) {
    if (tier === 'Budget') return '€1,500 - €5,000 / yr';
    if (tier === 'Premium') return '€10,000 - €18,000 / yr';
    return '€5,000 - €10,000 / yr';
  }

  // 12. Switzerland
  if (c === 'CH' || c.includes('SWITZERLAND')) {
    if (tier === 'Budget') return 'CHF 1,500 - 8,000 / yr';
    if (tier === 'Premium') return 'CHF 18,000 - 32,000 / yr';
    return 'CHF 8,000 - 18,000 / yr';
  }

  // 13. Sweden
  if (c === 'SE' || c.includes('SWEDEN')) {
    if (tier === 'Budget') return 'SEK 80,000 - 110,000 / yr';
    if (tier === 'Premium') return 'SEK 150,000 - 220,000 / yr';
    return 'SEK 110,000 - 150,000 / yr';
  }

  // 14. UAE / Dubai
  if (c === 'AE' || c.includes('UAE') || c.includes('DUBAI') || c.includes('EMIRATES')) {
    if (tier === 'Budget') return 'AED 35,000 - 55,000 / yr';
    if (tier === 'Premium') return 'AED 80,000 - 110,000 / yr';
    return 'AED 55,000 - 80,000 / yr';
  }

  // 15. Singapore
  if (c === 'SG' || c.includes('SINGAPORE')) {
    if (tier === 'Budget') return 'SGD 15,000 - 22,000 / yr';
    if (tier === 'Premium') return 'SGD 32,000 - 45,000 / yr';
    return 'SGD 22,000 - 32,000 / yr';
  }

  // 16. Japan
  if (c === 'JP' || c.includes('JAPAN')) {
    if (tier === 'Budget') return 'JPY 800,000 - 1,200,000 / yr';
    if (tier === 'Premium') return 'JPY 1,800,000 - 2,500,000 / yr';
    return 'JPY 1,200,000 - 1,800,000 / yr';
  }

  // 17. South Korea
  if (c === 'KR' || c.includes('KOREA')) {
    if (tier === 'Budget') return 'KRW 4,000,000 - 7,000,000 / yr';
    if (tier === 'Premium') return 'KRW 11,000,000 - 16,000,000 / yr';
    return 'KRW 7,000,000 - 11,000,000 / yr';
  }

  // 18. Malaysia
  if (c === 'MY' || c.includes('MALAYSIA')) {
    if (tier === 'Budget') return 'RM 18,000 - 28,000 / yr';
    if (tier === 'Premium') return 'RM 40,000 - 60,000 / yr';
    return 'RM 28,000 - 40,000 / yr';
  }

  // 19. Hong Kong
  if (c === 'HK' || c.includes('HONG KONG')) {
    if (tier === 'Budget') return 'HKD 90,000 - 130,000 / yr';
    if (tier === 'Premium') return 'HKD 170,000 - 220,000 / yr';
    return 'HKD 130,000 - 170,000 / yr';
  }

  // 20. China
  if (c === 'CN' || c.includes('CHINA')) {
    if (tier === 'Budget') return 'RMB 20,000 - 35,000 / yr';
    if (tier === 'Premium') return 'RMB 55,000 - 85,000 / yr';
    return 'RMB 35,000 - 55,000 / yr';
  }

  // 21. Bulgaria
  if (c === 'BG' || c.includes('BULGARIA')) {
    if (tier === 'Budget') return '€3,000 - €5,000 / yr';
    if (tier === 'Premium') return '€8,000 - €12,000 / yr';
    return '€5,000 - €8,000 / yr';
  }

  // 22. Finland
  if (c === 'FI' || c.includes('FINLAND')) {
    if (tier === 'Budget') return '€6,000 - €9,000 / yr';
    if (tier === 'Premium') return '€13,000 - €18,000 / yr';
    return '€9,000 - €13,000 / yr';
  }

  // 23. Poland
  if (c === 'PL' || c.includes('POLAND')) {
    if (tier === 'Budget') return 'PLN 12,000 - 20,000 / yr';
    if (tier === 'Premium') return 'PLN 32,000 - 50,000 / yr';
    return 'PLN 20,000 - 32,000 / yr';
  }

  // 24. Czech Republic
  if (c === 'CZ' || c.includes('CZECH')) {
    if (tier === 'Budget') return 'CZK 60,000 - 110,000 / yr';
    if (tier === 'Premium') return 'CZK 180,000 - 280,000 / yr';
    return 'CZK 110,000 - 180,000 / yr';
  }

  // 25. Hungary
  if (c === 'HU' || c.includes('HUNGARY')) {
    if (tier === 'Budget') return '€2,500 - €4,500 / yr';
    if (tier === 'Premium') return '€7,500 - €12,000 / yr';
    return '€4,500 - €7,500 / yr';
  }

  // 26. Other Europe default to Euro
  if (['MT', 'CY', 'LV', 'LT', 'SI', 'HR', 'BE', 'AT', 'ES', 'GR', 'PT'].includes(c)) {
    if (tier === 'Budget') return '€3,000 - €6,000 / yr';
    if (tier === 'Premium') return '€12,000 - €20,000 / yr';
    return '€6,000 - €12,000 / yr';
  }

  // Global Default USD
  if (tier === 'Budget') return '$10,000 - $15,000 / yr';
  if (tier === 'Premium') return '$25,000+ / yr';
  return '$15,000 - $25,000 / yr';
}
