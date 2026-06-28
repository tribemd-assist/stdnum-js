import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('to/passport', () => {
  it('format:123456', () => {
    const result = format('123456');

    expect(result).toEqual('123456');
  });

  test.each(['123456', '000123'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A12345', '1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
