import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('au/passport', () => {
  it('format:N1234567', () => {
    const result = format('N1234567');

    expect(result).toEqual('N1234567');
  });

  test.each(['N1234567', 'N1234567', 'n1234567'])(
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
