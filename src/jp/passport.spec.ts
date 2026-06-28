import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('jp/passport', () => {
  it('format:TR1234567', () => {
    const result = format('TR1234567');

    expect(result).toEqual('TR1234567');
  });

  test.each(['TR1234567', 'AB9876543'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A1234567', 'TR123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
