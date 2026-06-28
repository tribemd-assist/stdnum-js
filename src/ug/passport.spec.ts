import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ug/passport', () => {
  it('format:ABC123456', () => {
    const result = format('ABC123456');

    expect(result).toEqual('ABC123456');
  });

  test.each(['ABC123456', 'abc123456'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('ABC123456');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
