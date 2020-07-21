import Cuboid from '../../src/models/Cuboid';
import { withDefaults } from '../../src/db/utilities';

const cuboids = withDefaults([
  { width: 2, height: 2, depth: 2, bagId: 1 },
  { width: 3, height: 2, depth: 1, bagId: 2 },
  { width: 3, height: 4, depth: 2, bagId: 2 },
]);

export const seed = async (knex) => {
  await knex(Cuboid.tableName).del();
  await knex(Cuboid.tableName).insert(cuboids);
};
