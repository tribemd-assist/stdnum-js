import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('lk/passport', () => {
  it('format:N1234567', () => {
    const result = format('N1234567');

    expect(result).toEqual('N1234567');
  });

  test.each(['N1234567', 'OL123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['N123456', 'INVALID'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
