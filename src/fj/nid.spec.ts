import { validate, format } from './nid';
import { InvalidFormat } from '../exceptions';

describe('fj/nid', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', '12345678'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('12345678');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
