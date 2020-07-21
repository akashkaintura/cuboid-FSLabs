import { Model } from 'objection';

import knex from '../db/knex';

Model.knex(knex);

export default class Base extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}
