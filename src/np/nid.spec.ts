import { validate, format } from './nid';
import { InvalidFormat } from '../exceptions';

describe('np/nid', () => {
  it('format:1234567890', () => {
    const result = format('1234567890');

    expect(result).toEqual('1234567890');
  });

  test.each(['1234567890', '9876543210'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', '12345678901'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
