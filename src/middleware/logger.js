import logger from '../logger';

const responseLogLevel = (ctx) => {
  if (ctx.status >= 500) {
    return 'error';
  } else if (ctx.status >= 400) {
    return 'warn';
  }
  return 'debug';
};

export default async (ctx, next) => {
  const start = Date.now();

  const request = [ctx.method, ctx.originalUrl].join(' ');
  logger.debug(`<-- ${request}`);
  await next();

  const elapsed = Date.now() - start;

  logger.info(
    [ctx.method, ctx.originalUrl, ctx.status, `${elapsed}ms`].join(' ')
  );

  const reponseDetail = [
    ctx.method,
    ctx.originalUrl,
    JSON.stringify(ctx.body),
  ].join(' ');
  logger.log(responseLogLevel(ctx), `--> ${reponseDetail}`);
};
