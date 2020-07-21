import { Serializer, Deserializer } from 'jsonapi-serializer';

import base from './base';

export default {
  serializer: new Serializer('bag', {
    ...base.serializer,
    attributes: ['volume', 'cuboids'],
    cuboids: {
      ref: 'id',
      attributes: ['width', 'height', 'depth'],
    },
  }),
  deserializer: new Deserializer({
    ...base.deserializer,
  }),
};
