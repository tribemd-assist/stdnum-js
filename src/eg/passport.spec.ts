import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('eg/passport', () => {
  it('format:A12345678', () => {
    const result = format('A12345678');

    expect(result).toEqual('A12345678');
  });

  test.each(['A12345678', 'Z00000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1234567', 'A1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
