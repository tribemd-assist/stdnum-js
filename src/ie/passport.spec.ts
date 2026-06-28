import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ie/passport', () => {
  it('format:PA1234567', () => {
    const result = format('PA1234567');

    expect(result).toEqual('PA1234567');
  });

  test.each(['PA1234567', 'XA9876543'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['PAA123456', 'INVALID'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
