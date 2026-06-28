import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ag/passport', () => {
  it('format:B123456', () => {
    const result = format('B123456');

    expect(result).toEqual('B123456');
  });

  test.each(['B123456', 'A059888'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['B12345', 'AB12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
