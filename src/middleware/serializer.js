import camelCase from 'lodash/camelCase';
import serializers from '../serializers';

export default async (ctx, next) => {
  const payloadType = ctx.request?.body?.data?.type;
  const deserializer = serializers[payloadType]?.deserializer;

  if (deserializer && ctx.request.body) {
    ctx.state.data = await deserializer.deserialize(ctx.request.body);
  }

  await next();

  const resource = camelCase(ctx._matchedRouteName);
  const serializer = serializers[resource]?.serializer;

  if (ctx.status >= 400 || !ctx.body || !serializer) {
    return;
  }

  ctx.body = await serializer.serialize(ctx.body);
};
