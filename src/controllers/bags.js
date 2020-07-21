import Bag from '../models/Bag';

export const list = async (ctx) => {
  ctx.body = await Bag.query().withGraphFetched('cuboids');
};
