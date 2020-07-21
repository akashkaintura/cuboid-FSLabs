import Base from './Base';

export default class Bag extends Base {
  static get tableName() {
    return 'bags';
  }

  static get relationMappings() {
    return {
      cuboids: {
        relation: Base.HasManyRelation,
        modelClass: 'Cuboid',
        join: {
          from: 'bags.id',
          to: 'cuboids.bagId',
        },
      },
    };
  }
}
