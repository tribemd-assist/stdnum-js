import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ch/passport', () => {
  it('format:X1234567', () => {
    const result = format('X1234567');

    expect(result).toEqual('X1234567');
  });

  test.each(['X1234567', 'S0A00A00'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567X', 'X123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
