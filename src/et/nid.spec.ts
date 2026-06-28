import { validate, format } from './nid';
import { InvalidFormat } from '../exceptions';

describe('et/nid', () => {
  it('format:123456789012', () => {
    const result = format('123456789012');

    expect(result).toEqual('123456789012');
  });

  test.each(['123456789012', '987654321098'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['12345678', '1234567890123'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
