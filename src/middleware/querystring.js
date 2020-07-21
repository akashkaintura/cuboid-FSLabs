import qs from 'qs';

export default async (ctx, next) => {
  ctx.qs = qs.parse(ctx.querystring);
  await next();
};
