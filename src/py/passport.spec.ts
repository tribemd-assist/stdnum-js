import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('py/passport', () => {
  it('format:AB123456', () => {
    const result = format('AB123456');

    expect(result).toEqual('AB123456');
  });

  test.each(['AB123456', 'PY000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A123456', 'ABC12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
