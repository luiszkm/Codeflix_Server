import { ValueObject } from '../value-object';

class StubValueObject extends ValueObject {}

describe('ValueObject Unit Test', () => {
  it('should set value defined', () => {
    {
      const vo = new StubValueObject('string value');
      expect(vo.value).toEqual('string value');
    }
    {
      const vo = new StubValueObject({ prop: 'value1' });
      expect(vo.value).toStrictEqual({ prop: 'value1' });
    }
  });
  it('should convert to a string', () => {
    const date = new Date();
    const arrange = [
      { received: 1, expected: '1' },
      { received: 0, expected: '0' },
      { received: 'string', expected: 'string' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: date, expected: date.toString() },
      { received: { prop: 'value1' }, expected: '{"prop":"value1"}' },
      {
        received: { prop: 'value1' },
        expected: JSON.stringify({ prop: 'value1' }),
      },
    ];
    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + '').toEqual(value.expected);
    });
  });
  it("should  be a immutable object", () => {
    const obj = {
      prop1: 'value1',
      deep: { prop2: 'value2', prop3: new Date() },
    };
    const vo = new StubValueObject(obj);

    expect(() =>{ 
      (vo as any).value.prop1 = 'value2'
    }).toThrowError(TypeError);
    expect(() =>{ 
      (vo as any).value.deep.prop2 = 'value2'
    }).toThrowError(TypeError);
    expect( vo.value.deep.prop3).toBeInstanceOf(Date);
  })
  
});
