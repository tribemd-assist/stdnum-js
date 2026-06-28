import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('tt/passport', () => {
  it('format:TA123456', () => {
    const result = format('TA123456');

    expect(result).toEqual('TA123456');
  });

  test.each(['TA123456', 'TB987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABCDEF123456', 'TA12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
