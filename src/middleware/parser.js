import qs from 'qs';

export default async (ctx, next) => {
  ctx.qs = qs.parse(ctx.querystring);
  if (ctx?.params?.id) {
    ctx.params.id = parseInt(ctx.params.id, 10);
  }
  await next();
};
