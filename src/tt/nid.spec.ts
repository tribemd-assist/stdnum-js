import { validate, format } from './nid';
import { InvalidFormat } from '../exceptions';

describe('tt/nid', () => {
  it('format:1234567890', () => {
    const result = format('1234567890');

    expect(result).toEqual('1234567890');
  });

  test.each(['1234567890', '1000245768'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['12345678', '123456789A'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
