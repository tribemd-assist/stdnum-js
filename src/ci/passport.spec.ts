import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ci/passport', () => {
  it('format:AB123456', () => {
    const result = format('AB123456');

    expect(result).toEqual('AB123456');
  });

  test.each(['AB123456', 'ab123456'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('AB123456');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
