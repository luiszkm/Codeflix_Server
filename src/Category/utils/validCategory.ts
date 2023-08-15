import { randomUUID } from 'crypto';
const created_at = new Date();
export const ValidCategory = {
  id: randomUUID(),
  name: 'Category Name',
  description: 'Category Description',
  is_active: true,
  test: 'test',
  created_at,
  updated_at: new Date(created_at.getTime() + 1000),
};
