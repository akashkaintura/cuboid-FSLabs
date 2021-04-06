import HttpStatus from 'http-status-codes';

import Bag from '../models/Bag';
import { byId } from './filters';

export const list = async (req, res) => {
  const bags = await Bag.query()
    .where(byId(req.query))
    .withGraphFetched('cuboids');
  return res.status(200).json(bags);
};

export const get = async (req, res) => {
  const bag = await Bag.query()
    .findById(req.params.id)
    .withGraphFetched('cuboids');
  if (!bag) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }
  return res.status(200).json(bag);
};

export const create = async (req, res) => {
  const { volume, title } = req.body;
  const bag = await Bag.query().insert({ volume, title });
  return res.status(HttpStatus.CREATED).json(bag);
};
