import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('az/passport', () => {
  it('format:X05000107', () => {
    const result = format('X05000107');

    expect(result).toEqual('X05000107');
  });

  test.each(['X05000107', 'AA1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', 'ABC123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
