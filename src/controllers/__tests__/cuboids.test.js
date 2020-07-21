import HttpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../app';
import Bag from '../../models/Bag';
import Cuboid from '../../models/Cuboid';
import serializers from '../../serializers';
import factories from '../../factories';

const server = app.listen();

describe('cuboid list', () => {
  it('should get all cuboids', async () => {
    const sampleSize = 3;
    const bagId = (await Bag.query().insert(factories.bag.build())).id;
    const cuboids = factories.cuboid.buildList(sampleSize, { bagId });

    const ids = await Promise.all(
      cuboids.map(
        async ({ id, ...data }) => (await Cuboid.query().insert(data)).id
      )
    );

    const response = await request(server).get('/cuboids').query({
      'id[]': ids,
    });
    expect(response.status).toBe(HttpStatus.OK);

    const retrieved = await serializers.cuboid.deserializer.deserialize(
      response.body
    );

    expect(retrieved.length).toBe(ids.length);
    retrieved.forEach((cuboid) => {
      expect(cuboid.width).toBeDefined();
      expect(cuboid.height).toBeDefined();
      expect(cuboid.depth).toBeDefined();
      expect(cuboid.bag.id).toBe(bagId.toString());
    });
  });
});
