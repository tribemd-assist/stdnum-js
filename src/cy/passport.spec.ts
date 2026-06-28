import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('cy/passport', () => {
  it('format:K123456', () => {
    const result = format('K123456');

    expect(result).toEqual('K123456');
  });

  test.each(['K123456', 'L12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['KL123456', 'K12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
