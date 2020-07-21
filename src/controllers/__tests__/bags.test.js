import HttpStatus from 'http-status-codes';
import request from 'supertest';
import urlJoin from 'url-join';

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
      'ids[]': ids,
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

describe('bag get', () => {
  it('should get by id', async () => {
    const bag = factories.bag.build();
    const id = (await Bag.query().insert(bag)).id;

    const response = await request(server).get(urlJoin('/bags', id.toString()));
    expect(response.status).toBe(HttpStatus.OK);

    const deserialized = await serializers.bag.deserializer.deserialize(
      response.body
    );

    expect(typeof deserialized.id).toBe('string');
    expect(deserialized.id).toBe(id.toString());
  });

  it('should return not-found if not found', async () => {
    const response = await request(server).get(urlJoin('/bags', '0'));
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('bag create', () => {
  it('should create', async () => {
    const bag = factories.bag.build({ volume: 111 });
    const serialized = await serializers.bag.serializer.serialize(bag);

    const response = await request(server).post('/bags').send(serialized);
    expect(response.status).toBe(HttpStatus.CREATED);

    const deserialized = await serializers.bag.deserializer.deserialize(
      response.body
    );

    const { volume } = await Bag.query().findById(deserialized.id);
    expect(volume).toBe(bag.volume);
  });
});
