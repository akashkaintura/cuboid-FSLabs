import HttpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../app';
import Bag from '../../models/Bag';
import Cuboid from '../../models/Cuboid';
import factories from '../../factories';
import urlJoin from 'url-join';

const server = app.listen();

afterAll(() => server.close());

describe('cuboid get', () => {
  let bagId;

  beforeEach(async () => {
    bagId = (
      await Bag.query().insert(
        factories.bag.build({
          volume: 10000,
          title: 'A bag',
        })
      )
    ).id;
  });

  it('should get all cuboids', async () => {
    const sampleSize = 3;
    const cuboids = factories.cuboid.buildList(sampleSize, { bagId });

    const ids = await Promise.all(
      cuboids.map(
        async ({ id, ...data }) => (await Cuboid.query().insert(data)).id
      )
    );

    const response = await request(server).get('/cuboids').query({
      'ids[]': ids,
    });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.length).toBe(ids.length);

    response.body.forEach((cuboid) => {
      expect(cuboid.width).toBeDefined();
      expect(cuboid.height).toBeDefined();
      expect(cuboid.depth).toBeDefined();
      expect(cuboid.bag.id).toBe(bagId);
    });
  });

  it('should get by id', async () => {
    const cuboid = factories.cuboid.build({ bagId });
    const id = (await Cuboid.query().insert(cuboid)).id;

    const response = await request(server).get(
      urlJoin('/cuboids', id.toString())
    );

    expect(response.status).toBe(HttpStatus.OK);
    expect(typeof response.body.id).toBe('number');
    expect(response.body.id).toBe(id);
  });

  it('should get with volume', async () => {
    const cuboid = factories.cuboid.build({
      width: 4,
      height: 4,
      depth: 4,
      bagId,
    });
    const id = (await Cuboid.query().insert(cuboid)).id;

    const response = await request(server).get(
      urlJoin('/cuboids', id.toString())
    );

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.volume).toBe(64);
  });

  it('should return not-found if not found', async () => {
    const response = await request(server).get(urlJoin('/cuboids', '0'));
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('cuboid create', () => {
  let bag;

  beforeEach(async () => {
    bag = await Bag.query().insert(
      factories.bag.build({
        volume: 2000,
        title: 'A bag',
      })
    );
    const cuboids = factories.cuboid.buildList(3, {
      width: 10,
      height: 10,
      depth: 5,
      bagId: bag.id,
    });
    await Promise.all(cuboids.map((data) => Cuboid.query().insert(data)));
  });

  it('should succeed', async () => {
    const cuboid = factories.cuboid.build({
      width: 6,
      height: 7,
      depth: 8,
      bagId: bag.id,
    });

    const response = await request(server).post('/cuboids').send(cuboid);

    expect(response.status).toBe(HttpStatus.CREATED);

    const { width, height, depth, bagId } = await Cuboid.query().findById(
      response.body.id
    );

    expect(width).toBe(cuboid.width);
    expect(height).toBe(cuboid.height);
    expect(depth).toBe(cuboid.depth);
    expect(bagId).toBe(bag.id);
  });

  it('should fail if insufficient capacity', async () => {
    const cuboid = factories.cuboid.build({
      width: 7,
      height: 8,
      depth: 9,
      bagId: bag.id,
    });

    const response = await request(server).post('/cuboids').send(cuboid);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Insufficient capacity in bag');
  });
});

/**
 * DO NOT modify the tests ABOVE
 * IMPLEMENT the tests BELOW
 */

describe('cuboid update', () => {
  let bag;
  let cuboid;

  beforeEach(async () => {
    bag = await Bag.query().insert(
      factories.bag.build({
        volume: 250,
        title: 'A bag',
      })
    );
    await Cuboid.query().insert(
      factories.cuboid.build({
        width: 5,
        height: 5,
        depth: 5,
        bagId: bag.id,
      })
    );
    cuboid = await Cuboid.query().insert(
      factories.cuboid.build({
        width: 4,
        height: 4,
        depth: 4,
        bagId: bag.id,
      })
    );
  });

  it('should succeed to update the cuboid', () => {
    const [newWidth, newHeight, newDepth] = [5, 5, 5];
    const response = { body: {} };
    cuboid = response.body;

    expect(response.status).toBe(HttpStatus.OK);
    expect(cuboid.width).toBe(newWidth);
    expect(cuboid.height).toBe(newHeight);
    expect(cuboid.depth).toBe(newDepth);
    expect(cuboid.bagId).toBe(bag.id);
  });

  it('should fail to update if insufficient capacity and return 400 status code', () => {
    const [newWidth, newHeight, newDepth] = [6, 6, 6];
    const response = { body: {} };

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.width).not.toBe(newWidth);
    expect(response.body.height).not.toBe(newHeight);
    expect(response.body.depth).not.toBe(newDepth);
  });
});

describe('cuboid delete', () => {
  it('should delete the cuboid', () => {
    const response = {};

    expect(response.status).toBe(HttpStatus.OK);
  });

  it('should not delete and return 404 status code when cuboids doesnt exists', () => {
    const response = {};

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
