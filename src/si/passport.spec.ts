import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('si/passport', () => {
  it('format:PB1234567', () => {
    const result = format('PB1234567');

    expect(result).toEqual('PB1234567');
  });

  test.each(['PB1234567', 'PA7654321'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1234567', 'P12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
