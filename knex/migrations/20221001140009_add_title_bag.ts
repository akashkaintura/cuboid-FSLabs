import { Knex } from 'knex';
import { Bag } from '../../src/models';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(Bag.tableName, (table) => {
    table.string('title');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(Bag.tableName, (table) => {
    table.dropColumn('title');
  });
}
