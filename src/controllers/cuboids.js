import Cuboid from '../models/Cuboid';

export const list = async (ctx) => {
  ctx.body = await Cuboid.query().withGraphFetched('bag');
};
