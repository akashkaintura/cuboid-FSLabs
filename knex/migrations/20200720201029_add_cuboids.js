import Cuboid from '../../src/models/Cuboid';
import Bag from '../../src/models/Bag';

export const up = (knex) =>
  knex.schema.createTable(Cuboid.tableName, (table) => {
    table.increments();
    table.timestamps();
    table.integer('width');
    table.integer('height');
    table.integer('depth');
    table.integer('bagId');

    table.foreign('bagId').references('id').inTable(Bag.tableName);
  });

export const down = (knex) => knex.schema.dropTable(Cuboid.tableName);
