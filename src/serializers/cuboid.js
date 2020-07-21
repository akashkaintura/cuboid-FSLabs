import { Serializer, Deserializer } from 'jsonapi-serializer';

export default {
  serializer: new Serializer('cuboid', {
    attributes: ['width', 'length', 'depth'],
  }),
  deserializer: new Deserializer(),
};
