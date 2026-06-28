/**
 * NID (National Identity Card registry/identity number).
 *
 * Source
 *   https://en.wikipedia.org/wiki/Lebanese_identity_card
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/lebanon-tin.pdf
 *   https://www.consilium.europa.eu/prado/en/prado-documents/lbn/a/docs-per-category.html
 *   https://documents1.worldbank.org/curated/en/099041124084029152/pdf/P180980-185775b1-ea26-4988-9979-2b163afb83a8.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{1,12}$/;

const impl: Validator = {
  name: 'National Identity Card registry/identity number',
  localName: 'رقم الهوية',
  abbreviation: 'NID',

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
