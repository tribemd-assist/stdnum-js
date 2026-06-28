import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('bs/passport', () => {
  it('format:C123456', () => {
    const result = format('C123456');

    expect(result).toEqual('C123456');
  });

  test.each(['C123456', 'PA1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456', 'CD12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
