import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ye/passport', () => {
  it('format:03124578', () => {
    const result = format('03124578');

    expect(result).toEqual('03124578');
  });

  test.each(['03124578', '08765432'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['0312457', 'A3124578'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
