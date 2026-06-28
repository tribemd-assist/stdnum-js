import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('am/passport', () => {
  it('format:AN1234567', () => {
    const result = format('AN1234567');

    expect(result).toEqual('AN1234567');
  });

  test.each(['AN1234567', 'AB0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A1234567', 'AN123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
