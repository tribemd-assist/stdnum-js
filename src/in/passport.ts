/**
 * Indian Passport Number (भारतीय पासपोर्ट).
 *
 *
 * Source
 *   Passport number format for IN
 *   Pre-2021 and 2021 redesign: 1 letter + 7 digits
 *   New ePassport (2026+): 2 letters + 6 digits
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

// Support both old (1 letter + 7 digits) and new ePassport (2 letters + 6 digits) formats
const idRegexp = /^[A-Z]\d{7}$|^[A-Z]{2}\d{6}$/;

const impl: Validator = {
  name: 'Indian Passport Number',
  localName: 'भारतीय पासपोर्ट',
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
