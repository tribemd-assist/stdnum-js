import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('la/passport', () => {
  it('format:P1234567', () => {
    const result = format('P1234567');

    expect(result).toEqual('P1234567');
  });

  test.each(['P1234567', 'A0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', 'AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
