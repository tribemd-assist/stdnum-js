import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('ua/passport', () => {
  it('format:FC123456', () => {
    const result = format('FC123456');

    expect(result).toEqual('FC123456');
  });

  test.each(['FC123456', 'AB000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['F1234567', 'ABC123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
