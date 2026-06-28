import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('hr/passport', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  test.each(['123456789', '123456789', '123456789'])(
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
