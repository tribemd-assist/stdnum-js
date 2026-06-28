import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ng/passport', () => {
  it('format:A12345678', () => {
    const result = format('A12345678');

    expect(result).toEqual('A12345678');
  });

  test.each(['A12345678', 'a12345678'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('A12345678');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
