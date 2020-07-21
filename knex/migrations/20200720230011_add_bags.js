import Bag from '../../src/models/Bag';

export const up = (knex) =>
  knex.schema.createTable(Bag.tableName, (table) => {
    table.increments();
    table.timestamps();
    table.integer('volume');
  });

export const down = (knex) => knex.schema.dropTable(Bag.tableName);
