import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('kh/passport', () => {
  it('format:N1707843', () => {
    const result = format('N1707843');

    expect(result).toEqual('N1707843');
  });

  test.each(['N1707843', 'N00144521'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', 'N123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
