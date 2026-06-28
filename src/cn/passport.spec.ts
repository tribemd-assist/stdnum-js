import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('cn/passport', () => {
  it('format:EA1234567', () => {
    const result = format('EA1234567');

    expect(result).toEqual('EA1234567');
  });

  test.each(['EA1234567', 'G12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['EI1234567', 'INVALID'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
