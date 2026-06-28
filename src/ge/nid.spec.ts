import { validate, format } from './nid';
import { InvalidFormat } from '../exceptions';

describe('ge/nid', () => {
  it('format:12345678901', () => {
    const result = format('12345678901');

    expect(result).toEqual('12345678901');
  });

  test.each(['12345678901', '12345678901'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('12345678901');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
