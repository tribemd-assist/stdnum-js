import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('tt/passport', () => {
  it('format:ABCDEF123456', () => {
    const result = format('ABCDEF123456');

    expect(result).toEqual('ABCDEF123456');
  });

  test.each(['ABCDEF123456', 'abcdef123456'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual('ABCDEF123456');
    },
  );

  test.each(['INVALID', '12345', 'ABCDEFGH'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
