import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ao/passport', () => {
  it('format:N123456', () => {
    const result = format('N123456');

    expect(result).toEqual('N123456');
  });

  test.each(['N123456', 'N123456', 'n123456'])(
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
