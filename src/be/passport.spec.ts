import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('be/passport', () => {
  it('format:EM123456', () => {
    const result = format('EM123456');

    expect(result).toEqual('EM123456');
  });

  test.each(['EM123456', 'AB987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['E1234567', 'ABC12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
