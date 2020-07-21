import { Serializer, Deserializer } from 'jsonapi-serializer';

export default {
  serializer: new Serializer('bag', {
    attributes: ['volume', 'cuboids'],
    cuboids: {
      ref: 'id',
      attributes: ['width', 'height', 'depth'],
    },
  }),
  deserializer: new Deserializer(),
};
