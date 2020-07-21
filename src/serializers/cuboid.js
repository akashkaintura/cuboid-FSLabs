import { Serializer, Deserializer } from 'jsonapi-serializer';

import base from './base';

export default {
  serializer: new Serializer('cuboid', {
    ...base.serializer,
    attributes: ['width', 'height', 'depth', 'bag'],
    bag: {
      ref: 'id',
      attributes: ['volume'],
    },
  }),
  deserializer: new Deserializer({
    ...base.deserializer,
  }),
};
