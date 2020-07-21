import Router from 'koa-router';
import * as cuboids from './controllers/cuboids';

const router = new Router();

router
  .get('/', (ctx) => {
    ctx.body = 'Cuboids';
  })
  .get('cuboid', '/cuboids', cuboids.list);

export default router;
