import { validate, format } from './tin';
import { InvalidFormat } from '../exceptions';

describe('ng/tin', () => {
  it('format:1234567890', () => {
    const result = format('1234567890');

    expect(result).toEqual('1234567890');
  });

  test.each(['1234567890', '0123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', '12345678901', '123456780001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
