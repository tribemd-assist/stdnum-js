import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ge/passport', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', '1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
