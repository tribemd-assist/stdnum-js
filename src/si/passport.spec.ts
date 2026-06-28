import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('si/passport', () => {
  it('format:PA1234567', () => {
    const result = format('PA1234567');

    expect(result).toEqual('PA1234567');
  });

  test.each(['PA1234567', 'PA1234567', 'pa1234567'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toBeTruthy();
    },
  );

  test.each(['INVALID', '123456', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
