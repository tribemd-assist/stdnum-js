import { validate, format } from './passport';
import { InvalidFormat } from '../exceptions';

describe('gn/passport', () => {
  it('format:186100101190310', () => {
    const result = format('186100101190310');

    expect(result).toEqual('186100101190310');
  });

  test.each(['186100101190310', '194101000507883'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', '18610010119031'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
