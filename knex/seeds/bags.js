import Bag from '../../src/models/Bag';
import { withDefaults } from '../../src/db/utilities';

const bags = withDefaults([{ volume: 10 }, { volume: 20 }]);

export const seed = async (knex) => {
  await knex(Bag.tableName).del();
  await knex(Bag.tableName).insert(bags);
};
