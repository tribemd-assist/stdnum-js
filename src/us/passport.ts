/**
 * United States Passport Number (United States Passport).
 *
 *
 * Source
 *   Passport number format for US
 *   https://travel.state.gov/content/travel/en/passports/passport-help/next-generation-passport.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

// Support both old (9 digits) and new Next Generation (1 letter + 8 digits) formats
const idRegexp = /^\d{9}$|^[A-Z]\d{8}$/;

const impl: Validator = {
  name: 'United States Passport Number',
  localName: 'United States Passport',
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
