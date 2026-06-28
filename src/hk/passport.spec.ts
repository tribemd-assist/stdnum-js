import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('hk/passport', () => {
  it('format:A1234567', () => {
    const result = format('A1234567');

    expect(result).toEqual('A1234567');
  });

  test.each(['A1234567', 'AB123456C'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', 'A12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
