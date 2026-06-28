import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('sb/passport', () => {
  it('format:1234567', () => {
    const result = format('1234567');

    expect(result).toEqual('1234567');
  });

  test.each(['1234567', '0009999'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456', 'AB12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
