import * as exceptions from './exceptions';
import { stdnum } from './index';
import { ValidateReturn } from './types';

/**
 * Validate a passport number for a given country.
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

  if (!country || !country.passport) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }

  return country.passport.validate(value);
}

/**
 * Format a passport number for a given country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'BR', 'US', 'DE')
 * @param value - Passport number to format
 * @returns Formatted passport number (unchanged if the country is unsupported)
 */
export function formatPassport(countryCode: string, value: string): string {
  const country = stdnum[countryCode.toUpperCase()];

  if (!country || !country.passport) {
    return value;
  }

  return country.passport.format(value);
}

/**
 * Compact a passport number for a given country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'BR', 'US', 'DE')
 * @param value - Passport number to compact
 * @returns Compacted passport number (unchanged if the country is unsupported)
 */
export function compactPassport(countryCode: string, value: string): string {
  const country = stdnum[countryCode.toUpperCase()];

  if (!country || !country.passport) {
    return value;
  }

  return country.passport.compact(value);
}
