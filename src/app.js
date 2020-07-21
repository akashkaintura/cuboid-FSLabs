import Koa from 'koa';
import koaBody from 'koa-body';

import logger from './middleware/logger';
import errors from './middleware/errors';
import querystring from './middleware/querystring';
import serializer from './middleware/serializer';
import router from './router';

const app = new Koa();

app.use(logger);
app.use(errors);
app.use(querystring);
app.use(serializer);
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
