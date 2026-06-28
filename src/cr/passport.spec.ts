import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('cr/passport', () => {
  it('format:AB123456', () => {
    const result = format('AB123456');

    expect(result).toEqual('AB123456');
  });

  test.each(['AB123456', 'CR987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A1234567', 'ABC12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
