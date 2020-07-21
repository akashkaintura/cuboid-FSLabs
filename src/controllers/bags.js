import HttpStatus from 'http-status-codes';

import Bag from '../models/Bag';
import { byId } from './filters';

export const list = async (ctx) => {
  ctx.body = await Bag.query().where(byId(ctx.qs)).withGraphFetched('cuboids');
};

export const get = async (ctx) => {
  const bag = await Bag.query()
    .findById(ctx.params.id)
    .withGraphFetched('cuboids');
  if (!bag) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }
  ctx.body = bag;
};

export const create = async (ctx) => {
  const { volume } = ctx.state.data;
  ctx.body = await Bag.query().insert({ volume });
  ctx.status = HttpStatus.CREATED;
};
