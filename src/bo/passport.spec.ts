import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('bo/passport', () => {
  it('format:AB123456', () => {
    const result = format('AB123456');

    expect(result).toEqual('AB123456');
  });

  test.each(['AB123456', '1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['0', 'A'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
