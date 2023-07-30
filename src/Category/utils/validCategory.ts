import { randomUUID } from 'crypto';

export const ValidCategory = {
  id: randomUUID(),
  name: 'Category Name',
  description: 'Category Description',
  is_active: true,
  test: 'test',
  created_at: new Date(),
  updated_at: new Date(),
};
