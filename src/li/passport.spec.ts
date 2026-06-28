import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('li/passport', () => {
  it('format:A12345', () => {
    const result = format('A12345');

    expect(result).toEqual('A12345');
  });

  test.each(['A12345', 'A12345', 'a12345'])(
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
