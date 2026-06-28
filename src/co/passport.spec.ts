import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('co/passport', () => {
  it('format:A123456', () => {
    const result = format('A123456');

    expect(result).toEqual('A123456');
  });

  test.each(['A123456', 'A123456', 'a123456'])(
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
