import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('lb/passport', () => {
  it('format:LR1234567', () => {
    const result = format('LR1234567');

    expect(result).toEqual('LR1234567');
  });

  test.each(['LR1234567', '123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['LR123456', 'AB12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
