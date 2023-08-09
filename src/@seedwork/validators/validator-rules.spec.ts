import { ValidationError } from '../errors/validation-error';
import { ValidatorRules } from '../validators/validator-rules';

type ExpectedValidationRule = {
  value: any;
  property: string;
};

const arrange: ExpectedValidationRule[] = [
  { value: '', property: 'field' },
  { value: null, property: 'field' },
  { value: undefined, property: 'field' },
  { value: 0, property: 'field' },
  { value: false, property: 'field' },
  { value: [], property: 'field' },
  { value: {}, property: 'field' },
];

describe('Validator Rules Test Unit', () => {
  it('should be able to valid the property ', () => {
    const validator = ValidatorRules.Values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toEqual('some value');
    expect(validator['property']).toEqual('field');
  });

  it('should be able to valid the rules - Required Method ',  () => {
    const InvalidArrange = arrange.slice(0, 2);
    InvalidArrange.forEach((item) => {
      expect(() => {
        ValidatorRules.Values(item.value, item.property).Required();
      }).toThrow(new ValidationError('The field is required'));
    });
    expect(() => {
      ValidatorRules.Values('valid', "field").Required();
    }).not.toThrow(new ValidationError('The field is required'));
  });
  it('should be able to valid the rules - String Method ',  () => {
    const InvalidArrange = arrange.slice(3, arrange.length - 1);

    InvalidArrange.forEach((item) => {
      expect(() => {
        ValidatorRules.Values(item.value, item.property).String();
      }).toThrow(new ValidationError('The field must be a string'));
    });
    expect(() => {
      ValidatorRules.Values('valid', "field").Required();
    }).not.toThrow(new ValidationError('The field is required'));
  });
  it('should be able to valid the rules - MaxLength Method ',  () => {
    const InvalidArrange = [
      { value: ' ', property: 'field' },
      { value: '12', property: 'field' },
    ]

    InvalidArrange.forEach((item) => {
      expect(() => {
        ValidatorRules.Values(item.value, item.property).MaxLength(3);
      }).toThrow(new ValidationError('The field must be less than 3 characters'));
    });
    expect(() => {
      ValidatorRules.Values('valid', "field").MaxLength(3);
    }).not.toThrow(new ValidationError('The field must be less than 10 characters'));
  });
});



