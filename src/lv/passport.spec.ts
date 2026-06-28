import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('lv/passport', () => {
  it('format:LZ3263061', () => {
    const result = format('LZ3263061');

    expect(result).toEqual('LZ3263061');
  });

  test.each(['LZ3263061', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['LZ326306', 'ABC234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
