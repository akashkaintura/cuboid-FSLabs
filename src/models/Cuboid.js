import Base from './Base';

export default class Cuboid extends Base {
  static get tableName() {
    return 'cuboids';
  }

  static get relationMappings() {
    return {
      bag: {
        relation: Base.BelongsToOneRelation,
        modelClass: 'Bag',
        join: {
          from: 'cuboids.bagId',
          to: 'bags.id',
        },
      },
    };
  }
}
