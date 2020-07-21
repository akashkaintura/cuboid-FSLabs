import HttpStatus from 'http-status-codes';
import request from 'supertest';
import { Serializer } from 'jsonapi-serializer';

import app from '../../app';
import Bag from '../../models/Bag';
import Cuboid from '../../models/Cuboid';
import serializers from '../../serializers';
import factories from '../../factories';
import urlJoin from 'url-join';
import base from '../../serializers/base';

const requestSerializer = new Serializer('cuboid', {
  ...base.serializer,
  attributes: ['width', 'height', 'depth', 'bagId'],
});

const server = app.listen();

describe('cuboid get', () => {
  let bagId;

  beforeEach(async () => {
    bagId = (await Bag.query().insert(factories.bag.build({ volume: 10000 })))
      .id;
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

  it('should get by id', async () => {
    const cuboid = factories.cuboid.build({ bagId });
    const id = (await Cuboid.query().insert(cuboid)).id;

    const response = await request(server).get(
      urlJoin('/cuboids', id.toString())
    );
    expect(response.status).toBe(HttpStatus.OK);

    const deserialized = await serializers.cuboid.deserializer.deserialize(
      response.body
    );
    expect(typeof deserialized.id).toBe('string');
    expect(deserialized.id).toBe(id.toString());
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

    const deserialized = await serializers.cuboid.deserializer.deserialize(
      response.body
    );
    expect(deserialized.volume).toBe(64);
  });

  it('should return not-found if not found', async () => {
    const response = await request(server).get(urlJoin('/cuboids', '0'));
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('cuboid create', () => {
  let bag;

  beforeEach(async () => {
    bag = await Bag.query().insert(factories.bag.build({ volume: 2000 }));
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
    const serialized = await requestSerializer.serialize(cuboid);

    const response = await request(server)
      .post('/cuboids')
      .send({ data: serialized.data });
    expect(response.status).toBe(HttpStatus.CREATED);

    const deserialized = await serializers.cuboid.deserializer.deserialize(
      response.body
    );
    const { width, height, depth, bagId } = await Cuboid.query().findById(
      deserialized.id
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
    const serialized = await requestSerializer.serialize(cuboid);

    const response = await request(server)
      .post('/cuboids')
      .send({ data: serialized.data });
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Insufficient capacity in bag');
  });
});
