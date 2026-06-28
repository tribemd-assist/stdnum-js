import { stdnum } from './index';
import { ValidateReturn } from './types';

/**
 * Validate passport numbers for any country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'BR', 'US', 'DE')
 * @param value - Passport number to validate
 * @returns Validation result
 */
export function validatePassport(
  countryCode: string,
  value: string,
): ValidateReturn {
  const country = stdnum[countryCode.toUpperCase()];
  
  if (!country) {
    return {
      isValid: false,
      error: new Error(`Country ${countryCode} not supported`),
    };
  }

  if (!country.passport) {
    return {
      isValid: false,
      error: new Error(`Passport validation not available for ${countryCode}`),
    };
  }

  return country.passport.validate(value);
}

/**
 * Format passport numbers for any country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'BR', 'US', 'DE')
 * @param value - Passport number to format
 * @returns Formatted passport number
 */
export function formatPassport(
  countryCode: string,
  value: string,
): string {
  const country = stdnum[countryCode.toUpperCase()];
  
  if (!country || !country.passport) {
    return value;
  }

  return country.passport.format(value);
}

/**
 * Compact passport numbers for any country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'BR', 'US', 'DE')
 * @param value - Passport number to compact
 * @returns Compacted passport number
 */
export function compactPassport(
  countryCode: string,
  value: string,
): string {
  const country = stdnum[countryCode.toUpperCase()];
  
  if (!country || !country.passport) {
    return value;
  }

  return country.passport.compact(value);
}