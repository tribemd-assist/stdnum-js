import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ee/passport', () => {
  it('format:K1234567', () => {
    const result = format('K1234567');

    expect(result).toEqual('K1234567');
  });

  test.each(['K1234567', 'A0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1234567', 'K123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
