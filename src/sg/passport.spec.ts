import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('sg/passport', () => {
  it('format:E1234567X', () => {
    const result = format('E1234567X');

    expect(result).toEqual('E1234567X');
  });

  test.each(['E1234567X', 'K7654321Z'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', 'E12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
