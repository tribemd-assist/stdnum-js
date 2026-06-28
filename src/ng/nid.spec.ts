import { validate, format } from './nid';
import { InvalidFormat } from '../exceptions';

describe('ng/nid', () => {
  it('format:13478900989', () => {
    const result = format('13478900989');

    expect(result).toEqual('13478900989');
  });

  test.each(['13478900989', '00000000000'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1347890098', '134789009890'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
