import Cuboid from '../../src/models/Cuboid';

const now = new Date().toISOString();

const withDefaults = (items) =>
  items.map((item, index) => ({
    ...item,
    id: index + 1,
    createdAt: now,
    updatedAt: now,
  }));

const cuboids = withDefaults([
  { width: 2, height: 2, depth: 2 },
  { width: 3, height: 2, depth: 1 },
  { width: 3, height: 4, depth: 2 },
]);

export const seed = async (knex) => {
  await knex(Cuboid.tableName).del();
  await knex(Cuboid.tableName).insert(cuboids);
};
