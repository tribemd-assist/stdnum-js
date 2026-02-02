import { validate, format } from './nuit';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('mz/nuit', () => {
  it('format:400012345', () => {
    const result = format('400012345');

    expect(result).toEqual('40001234-5');
  });

  it('format:40.001.234-5', () => {
    const result = format('40.001.234-5');

    expect(result).toEqual('40001234-5');
  });

  it('validate:40001234-0', () => {
    const result = validate('40001234-0');

    expect(result.isValid && result.compact).toEqual('400012340');
  });

  it('validate:400012340', () => {
    const result = validate('400012340');
    
    expect(result.isValid && result.compact).toEqual('400012340');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567890', () => {
    const result = validate('1234567890');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:4000123A5', () => {
    const result = validate('4000123A5');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:40001234-6', () => {
    // DV correto para 40001234 é 5, não 6
    const result = validate('40001234-6');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:99999999-9', () => {
    // Número inválido com DV errado
    const result = validate('99999999-9');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:00000000-0', () => {
    // Caso especial: soma = 0 → resto = 0 → DV = 0 → válido
    const result = validate('00000000-0');

    expect(result.isValid && result.compact).toEqual('000000000');
  });

  it('validate:11111111-1', () => {
    // 1*9 + 1*8 + ... + 1*2 = 44 → 44 % 11 = 0 → DV = 0, não 1
    const result = validate('11111111-1');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:11111111-0', () => {
    // Mesmo caso acima, mas com DV correto = 0
    const result = validate('11111111-0');

    expect(result.isValid && result.compact).toEqual('111111110');
  });
});