import { Id, RelationMappings } from 'objection';
import { Cuboid } from './Cuboid';
import Base from './Base';

export class Bag extends Base {
  id!: Id;
  volume!: number;
  title!: string;
  // payloadVolume!: number;
  // availableVolume!: number;
  cuboids?: Cuboid[] | undefined;

  static tableName = 'bags';

  static get relationMappings(): RelationMappings {
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

  static get virtualAttributes(): Array<string> {
    return ['payloadVolume', 'availableVolume'];
  }

  get payloadVolume() {
    return (
      this.cuboids
        ?.map((cuboid) => cuboid.volume)
        .reduce((prev, current) => prev + current, 0) || 0
    );
  }

  get availableVolume() {
    return this.volume - this.payloadVolume;
  }
}

export default Bag;
