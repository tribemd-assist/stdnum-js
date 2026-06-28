import { validate, format } from './nid';
import { InvalidFormat } from '../exceptions';

describe('bd/nid', () => {
  it('format:1234567890123', () => {
    const result = format('1234567890123');

    expect(result).toEqual('1234567890123');
  });

  test.each(['1234567890123', '1234567890123'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('1234567890123');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
