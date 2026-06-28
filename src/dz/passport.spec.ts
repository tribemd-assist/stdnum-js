import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('dz/passport', () => {
  it('format:855609385', () => {
    const result = format('855609385');

    expect(result).toEqual('855609385');
  });

  test.each(['855609385', '197025599'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', 'AS0123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
