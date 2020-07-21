import faker from 'faker';
import { Factory } from 'rosie';

export default Factory.define('cuboid').attrs({
  width: () => faker.random.number(10),
  height: () => faker.random.number(10),
  depth: () => faker.random.number(10),
});
