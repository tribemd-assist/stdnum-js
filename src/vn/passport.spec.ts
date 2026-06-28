import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('vn/passport', () => {
  it('format:C1234567', () => {
    const result = format('C1234567');

    expect(result).toEqual('C1234567');
  });

  test.each(['C1234567', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', 'C123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
