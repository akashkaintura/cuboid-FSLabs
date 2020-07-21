import logger from '../logger';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const { message, meta, status = 500 } = err;
    ctx.status = status;
    ctx.body = {
      message,
      meta,
      status,
    };
    logger.error(err);
  }
};
