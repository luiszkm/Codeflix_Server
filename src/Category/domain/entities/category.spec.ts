import { Category } from './category';
import { ValidCategory } from '../../utils/validCategory';

describe('Category Unit Test', () => {
  it('should be able to create a new category with constructor', () => {
    let category = new Category({ name: 'Category Name' });
    const dateValid =
      category.props.created_at instanceof Date &&
      category.props.updated_at instanceof Date;
    expect(dateValid).toBe(true);

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

  it('getter of name props', () => {
    const category = new Category({ name: 'Category Name' });

    expect(category.props.name).toEqual('Category Name');
  });
  it('id props should be a valid uuid', () => {
    const category = new Category({ name: 'Category Name' });
    const isValidUUID = (uuid) => {
      const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      return uuidRegex.test(uuid);
    };
    expect(isValidUUID(category.id)).toBeTruthy();
    expect(isValidUUID('invalid uuid')).toBeFalsy();
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
});
