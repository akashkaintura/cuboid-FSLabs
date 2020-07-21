import { withDefaults } from '../utilities';

describe('withDefaults', () => {
  it('should have base attributes', () => {
    const attributes = [{ x: 'a' }, { x: 'b' }];
    const items = withDefaults(attributes);
    items.forEach((item) => {
      expect(item.id).toBeGreaterThanOrEqual(1);
      expect(items.filter(({ id }) => id === item.id).length).toBe(1);
      expect(item.createdAt).not.toBeNull();
      expect(item.updatedAt).not.toBeNull();
    });
  });
});
