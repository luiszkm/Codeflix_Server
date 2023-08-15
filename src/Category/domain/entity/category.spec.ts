import { Category } from './category';
import { ValidCategory } from '../../utils/validCategory';

const created_at = new Date('2020-01-01');
describe('Category Unit Test', () => {
  beforeEach(() => {
    Category.Validate = jest.fn();
  });

  it('should be able to create a new category with constructor', () => {
    let category = new Category({ name: 'Category Name' });
    const dateValid =
      category.props.created_at instanceof Date &&
      category.props.updated_at instanceof Date;

    expect(dateValid).toBe(true);
    expect(Category.Validate).toHaveBeenCalled();
    expect(category.props).toStrictEqual({
      name: 'Category Name',
      description: null,
      is_active: true,
      created_at: category.props.created_at,
      updated_at: category.props.updated_at,
    });

    category = new Category({ name: 'Category Name', is_active: false });
    expect(category.props).toStrictEqual({
      name: 'Category Name',
      description: null,
      is_active: false,
      created_at: category.props.created_at,
      updated_at: category.props.updated_at,
    });

    category = new Category({
      name: 'Category Name',
      description: 'Category Description',
      is_active: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(category.props).toStrictEqual({
      name: 'Category Name',
      description: 'Category Description',
      is_active: false,
      created_at: category.props.created_at,
      updated_at: category.props.updated_at,
    });
  });
  it('should be able to create a new category with valid data', () => {
    const category = new Category(ValidCategory);
    expect(category).toBeInstanceOf(Category);
    expect(category.props).toStrictEqual(ValidCategory);
  });
  it('getter and setter of name props', () => {
    const category = new Category({ name: 'Category Name' });

    expect(category.props.name).toEqual('Category Name');
    category['name'] = 'Category Name 2';
    expect(category.props.name).toEqual('Category Name 2');
  });
  it('getter and setter of description props', () => {
    const category = new Category({
      name: 'Category Name',
      description: 'Category Description',
    });

    expect(category.props).toMatchObject({
      name: 'Category Name',
      description: 'Category Description',
    });
    category['description'] = 'Category Description 2';
    expect(category.props.description).toEqual('Category Description 2');

    category['description'] = undefined;
    expect(category.props.description).toBeNull();

    category['description'] = null;
    expect(category.props.description).toBeNull();
  });
  it('getter and setter of is_active props', () => {
    let category = new Category({ name: 'Category Name' });
    expect(category.props.is_active).toBe(true);

    category = new Category({
      name: 'Category Name',
      is_active: false,
    });
    expect(category.props.is_active).toBe(false);

    category = new Category({
      name: 'Category Name',
      is_active: true,
    });
    expect(category.props.is_active).toBe(true);
  });
  it('getter of created_at props', () => {
    const dateValid = new Date('2020-01-01');
    let category = new Category({ name: 'Category Name' });
    expect(category.props.created_at instanceof Date).toBe(true);
    category = new Category({
      name: 'Category Name',
      created_at: dateValid,
    });
    expect(category.props.created_at).toEqual(dateValid);
  });
  it("should be able to update a category's name", () => {
    const spy = jest.spyOn(Category.prototype as any, 'Update');
    const category = new Category({ name: 'Category Name', created_at });
    category.Update({
      name: 'Category Name 2',
      description: category.props.description,
    });
    const isUpdated = category.created_at < category.updated_at;
    expect(isUpdated).toBe(true);
    expect(Category.Validate).toHaveBeenCalledTimes(2);
    expect(category.props.name).toEqual('Category Name 2');
    expect(spy).toHaveBeenCalled();
  });
  it("should be able to update a category's description", () => {
    const spy = jest.spyOn(Category.prototype as any, 'Update');
    const category = new Category({
      name: 'Category Name',
      description: 'Category Description',
      created_at,
    });
    category.Update({
      name: category.props.name,
      description: 'Category Description 2',
    });
    const isUpdated = category.created_at < category.updated_at;
    expect(isUpdated).toBe(true);
    expect(Category.Validate).toHaveBeenCalledTimes(2);
    expect(category.props.description).toEqual('Category Description 2');
    expect(spy).toHaveBeenCalled();
  });
  it("should be able to update a category's name and description", () => {
    const spy = jest.spyOn(Category.prototype as any, 'Update');
    const category = new Category({
      name: 'Category Name',
      description: 'Category Description',
      created_at,
    });
    category.Update({
      name: 'Category Name 2',
      description: 'Category Description 2',
    });
    const isUpdated = category.created_at < category.updated_at;
    expect(Category.Validate).toHaveBeenCalledTimes(2);
    expect(category.props.name).toEqual('Category Name 2');
    expect(category.props.description).toEqual('Category Description 2');
    expect(isUpdated).toBe(true);
    expect(spy).toHaveBeenCalled();
  });
  it("should be able to update a category's is_active to Active ", () => {
    const spy = jest.spyOn(Category.prototype as any, 'Activate');
    const category = new Category({ name: 'Category Name', created_at });
    category.Activate();
    const isUpdated = category.created_at < category.updated_at;
    expect(isUpdated).toBe(true);
    expect(category.props.is_active).toBe(true);
    expect(spy).toHaveBeenCalled();
  });
  it("should be able to update a category's is_active to Deactivate ", () => {
    const spy = jest.spyOn(Category.prototype as any, 'Deactivate');
    const category = new Category({ name: 'Category Name', created_at });
    category.Deactivate();
    const isUpdated = category.created_at < category.updated_at;
    expect(isUpdated).toBe(true);
    expect(category.props.is_active).toBe(false);
    expect(spy).toHaveBeenCalled();
  });
});
