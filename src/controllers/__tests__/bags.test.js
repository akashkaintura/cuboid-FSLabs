import HttpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../app';
import Bag from '../../models/Bag';
import serializers from '../../serializers';
import factories from '../../factories';

const server = app.listen();

describe('bag list', () => {
  it('should get all bags', async () => {
    const sampleSize = 3;
    const bags = factories.bag.buildList(sampleSize);

    const ids = await Promise.all(
      bags.map(async ({ id, ...data }) => (await Bag.query().insert(data)).id)
    );

    const response = await request(server).get('/bags').query({
      'id[]': ids,
    });
    expect(response.status).toBe(HttpStatus.OK);

    const retrieved = await serializers.bag.deserializer.deserialize(
      response.body
    );

    expect(retrieved.length).toBe(ids.length);
    retrieved.forEach((bag) => {
      expect(bag.volume).toBeDefined();
      expect(bag.cuboids).toBeDefined();
    });
  });
});
