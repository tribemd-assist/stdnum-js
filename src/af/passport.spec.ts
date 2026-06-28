import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('af/passport', () => {
  it('format:P01234567', () => {
    const result = format('P01234567');

    expect(result).toEqual('P01234567');
  });

  test.each(['P01234567', 'O98765432'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', 'PA1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
