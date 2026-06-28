import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('tr/passport', () => {
  it('format:U12345678', () => {
    const result = format('U12345678');

    expect(result).toEqual('U12345678');
  });

  test.each(['U12345678', 'A00000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['U1234567', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
