import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('nz/passport', () => {
  it('format:LA123456', () => {
    const result = format('LA123456');

    expect(result).toEqual('LA123456');
  });

  test.each(['LA123456', 'EA615098'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['L1234567', 'AB12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
