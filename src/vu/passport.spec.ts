import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('vu/passport', () => {
  it('format:RR123456', () => {
    const result = format('RR123456');

    expect(result).toEqual('RR123456');
  });

  test.each(['RR123456', '1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABCDE123456789', 'INVALID'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
