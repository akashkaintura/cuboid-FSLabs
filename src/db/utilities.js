const now = new Date().toISOString();

export const withDefaults = (items) =>
  items.map((item, index) => ({
    ...item,
    id: index + 1,
    createdAt: now,
    updatedAt: now,
  }));
