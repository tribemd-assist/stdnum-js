import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('no/passport', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', '30000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567', 'AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
