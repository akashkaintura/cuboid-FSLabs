import Router from 'koa-router';
import * as bags from './controllers/bags';
import * as cuboids from './controllers/cuboids';

const router = new Router();

router
  .get('/', (ctx) => {
    ctx.body = 'Cuboids';
  })
  .get('bag', '/bags', bags.list)
  .get('bag', '/bags/:id', bags.get)
  .post('bag', '/bags', bags.create)
  .get('cuboid', '/cuboids', cuboids.list)
  .get('cuboid', '/cuboids/:id', cuboids.get)
  .post('cuboid', '/cuboids', cuboids.create);

export default router;
