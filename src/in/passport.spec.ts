import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('in/passport', () => {
  it('format:K1234567', () => {
    const result = format('K1234567');

    expect(result).toEqual('K1234567');
  });

  test.each(['K1234567', 'A9876543'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', 'K123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
