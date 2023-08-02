import { UniqueEntityId } from './unique-entity-id';

const isValidUUID = (uuid: string) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};
describe('UniqueEntityId Test', () => {
  it('id props should be a valid uuid', () => {
    const validateSpy = jest.spyOn(
      UniqueEntityId.prototype as any,
      'ValidateId',
    );
    const uuid_vo = new UniqueEntityId();

    expect(validateSpy).toHaveBeenCalled();
    expect(isValidUUID(uuid_vo['id'])).toBeTruthy();
  });
  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(
      UniqueEntityId.prototype as any,
      'ValidateId',
    );
    expect(() => new UniqueEntityId('invalid uuid')).toThrowError();
    expect(validateSpy).toHaveBeenCalled();
  });
  it('should throw error when uuid is invalid', () => {
    const uuid = '1129e4ff-9561-4d72-9713-f35525297d65';
    const valid = new UniqueEntityId(uuid);

    const validateSpy = jest.spyOn(
      UniqueEntityId.prototype as any,
      'ValidateId',
    );
    expect(isValidUUID(valid['id'])).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
