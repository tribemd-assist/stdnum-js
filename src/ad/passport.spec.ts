import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ad/passport', () => {
  it('format:O1234567', () => {
    const result = format('O1234567');

    expect(result).toEqual('O1234567');
  });

  test.each(['O1234567', 'A0598881'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['12345678', 'O123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
