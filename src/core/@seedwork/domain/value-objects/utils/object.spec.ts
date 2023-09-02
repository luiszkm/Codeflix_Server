import { deepFreeze } from './object';

describe('Object unit test', () => {
  it('should  be a immutable object', () => {
    const obj = deepFreeze({
      prop1: 'value1',
      deep: { prop2: 'value2', prop3: new Date() },
    });

    expect(() => {
      (obj as any).prop1 = 'value2';
    }).toThrowError(TypeError);
    expect(() => {
      (obj as any).deep.prop2 = 'value2';
    }).toThrowError(TypeError);
    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
  it('should  not freeze a scalar value', () => {
    const arranges = [
      { received: true, type: 'boolean' },
      { received: false, type: 'boolean' },
      { received: 1, type: 'number' },
      { received: 'string', type: 'string' },
    ];
    arranges.forEach((arrange) => {
      const value = deepFreeze(arrange.received);
      expect(typeof value).toEqual(arrange.type);
    });
  });
});
