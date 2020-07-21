const massage = (payload) =>
  Object.entries(payload).reduce((acc, [key, value]) => {
    if (key.endsWith('Id') && !!value) {
      return { ...acc, [key]: value.toString() };
    }

    return { ...acc, [key]: value };
  }, {});

export default async (ctx, next) => {
  await next();

  if (ctx.status >= 400 || !ctx.body || !ctx._matchedRouteName) {
    return;
  }

  ctx.body = Array.isArray(ctx.body)
    ? ctx.body.map(massage)
    : massage(ctx.body);
};
