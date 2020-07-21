import config from '../config';
import Cuboid from '../models/Cuboid';

export const list = async (ctx) => {
  const { qs } = ctx;

  const page = qs.page ? parseInt(qs.page, 10) : config.defaultPage;
  const pageSize = qs.pageSize
    ? parseInt(qs.pageSize, 10)
    : config.defaultPageSize;

  const results = await Cuboid.query().select().page(page, pageSize);

  ctx.state.page = page;
  ctx.state.pageSize = pageSize;
  ctx.state.totalResults = results.total;
  ctx.body = results.results;
};
