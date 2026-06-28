import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('rs/passport', () => {
  it('format:008000000', () => {
    const result = format('008000000');

    expect(result).toEqual('008000000');
  });

  test.each(['008000000', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1234567', '12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
