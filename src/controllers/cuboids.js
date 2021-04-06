import HttpStatus from 'http-status-codes';
import Cuboid from '../models/Cuboid';
import { byId } from './filters';

export const list = async (req, res) => {
  const cuboids = await Cuboid.query()
    .where(byId(req.query))
    .withGraphFetched('bag');
  return res.status(200).json(cuboids);
};

export const get = async (req, res) => res.sendStatus(200);

export const create = async (req, res) => {
  const { width, height, depth, bagId } = req.body;
  const cuboid = await Cuboid.query().insert({
    width,
    height,
    depth,
    bagId,
  });
  return res.status(HttpStatus.CREATED).json(cuboid);
};
