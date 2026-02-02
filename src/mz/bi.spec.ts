import { validate, format } from './bi';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('mz/bi', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  it('format:12.345.678-9', () => {
    const result = format('12.345.678-9');

    expect(result).toEqual('123456789');
  });

  it('validate:123456789', () => {
    const result = validate('123456789');

    expect(result.isValid && result.compact).toEqual('123456789');
  });

  it('validate:12.345.678-9', () => {
    const result = validate('12.345.678-9');

    expect(result.isValid && result.compact).toEqual('123456789');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567890', () => {
    const result = validate('1234567890');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345678A', () => {
    const result = validate('12345678A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:12345 6789', () => {
    const result = validate('12345 6789');

    expect(result.isValid && result.compact).toEqual('123456789');
  });
});