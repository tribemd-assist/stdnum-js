import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('br/passport', () => {
  it('format:FA123456', () => {
    const result = format('FA123456');

    expect(result).toEqual('FA123456');
  });

  test.each(['FA123456', 'BR000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['F1234567', 'FA12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
