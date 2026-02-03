/**
 * BI (Bilhete de Identidade, Mozambican national identity document).
 *
 * The Bilhete de Identidade is the official national identity document issued
 * to Mozambican citizens aged 12 and above. The traditional paper-based BI
 * consists of 9 numeric digits. The newer biometric BI uses an alphanumeric
 * format, but public validation rules (including checksums) are not officially
 * documented.
 *
 * This validator supports only the traditional 9-digit numeric format.
 *
 * Source:
 *     Serviço de Migração e Estrangeiros (SME), República de Moçambique
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Mozambican National Identity Document',
  localName: 'Bilhete de Identidade',
  abbreviation: 'BI',

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
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
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
