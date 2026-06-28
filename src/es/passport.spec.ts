import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('es/passport', () => {
  it('format:AB1234561', () => {
    const result = format('AB1234561');

    expect(result).toEqual('AB1234561');
  });

  test.each(['AB1234561', 'XY123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABCD123456', 'A123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
