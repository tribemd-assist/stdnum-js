import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('cu/passport', () => {
  it('format:C123456', () => {
    const result = format('C123456');

    expect(result).toEqual('C123456');
  });

  test.each(['C123456', 'A987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', 'C12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
