import Router from 'koa-router';
import * as bags from './controllers/bags';
import * as cuboids from './controllers/cuboids';

const router = new Router();

router
  .get('/', (ctx) => {
    ctx.body = 'Cuboids';
  })
  .get('bag', '/bags', bags.list)
  .get('cuboid', '/cuboids', cuboids.list);

export default router;
