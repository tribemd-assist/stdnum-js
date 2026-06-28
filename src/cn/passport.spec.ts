import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('cn/passport', () => {
  it('format:G12345678', () => {
    const result = format('G12345678');

    expect(result).toEqual('G12345678');
  });

  test.each(['G12345678', 'G12345678', 'g12345678'])(
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
