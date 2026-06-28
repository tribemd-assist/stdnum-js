import { validate, format } from './tin';
import { InvalidFormat } from '../exceptions';

describe('fj/tin', () => {
  it('format:115725203', () => {
    const result = format('115725203');

    expect(result).toEqual('115725203');
  });

  test.each(['115725203', '2912345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['12345678', '11572520A', '290123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
