import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('to/passport', () => {
  it('format:123456', () => {
    const result = format('123456');

    expect(result).toEqual('123456');
  });

  test.each(['123456', '123456'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('123456');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
