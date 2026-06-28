import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('fr/passport', () => {
  it('format:12AB34567', () => {
    const result = format('12AB34567');

    expect(result).toEqual('12AB34567');
  });

  test.each(['12AB34567', '12AB34567', '12ab34567'])(
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
