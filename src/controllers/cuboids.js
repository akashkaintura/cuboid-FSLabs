import HttpStatus from 'http-status-codes';
import Cuboid from '../models/Cuboid';
import { byId } from './filters';

export const list = async (ctx) => {
  ctx.body = await Cuboid.query().where(byId(ctx.qs)).withGraphFetched('bag');
};

export const get = async (ctx) => {
  ctx.body = await Cuboid.query()
    .findById(ctx.params.id)
    .withGraphFetched('bag');
  if (!ctx.body) {
    ctx.status = HttpStatus.NOT_FOUND;
  }
};

export const create = async (ctx) => {
  const { width, height, depth, bagId } = ctx.state.data;
  ctx.body = await Cuboid.query().insert({
    width,
    height,
    depth,
    bagId,
  });
  ctx.status = HttpStatus.CREATED;
};
