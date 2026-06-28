import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('bz/passport', () => {
  it('format:PA123456', () => {
    const result = format('PA123456');

    expect(result).toEqual('PA123456');
  });

  test.each(['PA123456', 'BZ654321'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['P1234567', 'AB12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
