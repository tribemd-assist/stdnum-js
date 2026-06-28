import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('id/passport', () => {
  it('format:A123456', () => {
    const result = format('A123456');

    expect(result).toEqual('A123456');
  });

  test.each(['A123456', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABC1234567', '12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
