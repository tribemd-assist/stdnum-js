import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('kr/passport', () => {
  it('format:M12345678', () => {
    const result = format('M12345678');

    expect(result).toEqual('M12345678');
  });

  test.each(['M12345678', 'M123A4567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A12345678', 'M1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
