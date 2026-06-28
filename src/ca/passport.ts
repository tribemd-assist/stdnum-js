/**
 * Canadian Passport Number (Passeport canadien).
 *
 *
 * Source
 *   Passport number format for CA
 *   https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/new-passport-features.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

// Support both old (2 letters + 6 digits) and new (1 letter + 6 digits + 2 letters) formats
const idRegexp = /^[A-Z]{2}\d{6}$|^[A-Z]\d{6}[A-Z]{2}$/;

const impl: Validator = {
  name: 'Canadian Passport Number',
  localName: 'Passeport canadien',
  abbreviation: 'Passport',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return value;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }

    const match = value.match(idRegexp);
    if (!match) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
