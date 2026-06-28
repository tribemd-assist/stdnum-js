import { validate, format } from './tin';
import { InvalidFormat } from '../exceptions';

describe('ph/tin', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  test.each(['123456789', '123456789000'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567890', '12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
