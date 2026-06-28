import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('sr/passport', () => {
  it('format:R123456', () => {
    const result = format('R123456');

    expect(result).toEqual('R123456');
  });

  test.each(['R123456', 'B1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', '1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
