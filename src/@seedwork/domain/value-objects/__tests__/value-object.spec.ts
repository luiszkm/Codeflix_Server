import { ValueObject } from "../value-object";

class StubValueObject extends ValueObject {
}

describe('ValueObject Unit Test', () => {
  it('should set value defined', () => {
    {
      const vo = new StubValueObject('string value');
      expect(vo.value).toEqual('string value');
    }
    {
      const vo = new StubValueObject({prop: 'value1'});
      expect(vo.value).toStrictEqual({prop: 'value1'});
    }
  });
})