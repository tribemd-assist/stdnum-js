import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('fr/passport', () => {
  it('format:14CV28142', () => {
    const result = format('14CV28142');

    expect(result).toEqual('14CV28142');
  });

  test.each(['14CV28142', '09AB12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
