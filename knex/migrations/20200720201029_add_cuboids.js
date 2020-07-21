import Cuboid from '../../src/models/Cuboid';

export const up = (knex) =>
  knex.schema.createTable(Cuboid.tableName, (table) => {
    table.increments();
    table.timestamps();
    table.integer('width');
    table.integer('height');
    table.integer('depth');
  });

export const down = (knex) => knex.schema.dropTable(Cuboid.tableName);
