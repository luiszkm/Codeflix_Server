import { Category } from "./category";
import { ValidCategory } from "../../utils/validCategory";

describe('Category Unit Test', () => {
  it('should be able to create a new category only name props', () => {
    const category = new Category({name: "Category Name"	});
    const dateValid = category.props.created_at instanceof Date && category.props.updated_at instanceof Date;

    expect(category.props).toStrictEqual({
      name: "Category Name",
      description: null,
      is_active: true,
      created_at: category.props.created_at,
      updated_at: category.props.updated_at
    })
    expect(dateValid).toBe(true);

  });
  it('should be able to create a new category only name propsa and isActive false', () => {
    const category = new Category({name: "Category Name", is_active: false	});
    const dateValid = category.props.created_at instanceof Date && category.props.updated_at instanceof Date;

    expect(category.props).toStrictEqual({
      name: "Category Name",
      description: null,
      is_active: false,
      created_at: category.props.created_at,
      updated_at: category.props.updated_at
    })
    expect(dateValid).toBe(true);

  });
  it('should be able to create a new category with all props', () => {
    
    const category = new Category({
      name: "Category Name",
      description: "Category Description",
      is_active: false,
      created_at: new Date(),
      updated_at: new Date()
    });
   
    expect(category.props).toStrictEqual({
      name: "Category Name",
      description: "Category Description",
      is_active: false,
      created_at: category.props.created_at,
      updated_at: category.props.updated_at
    })
    
  });
})