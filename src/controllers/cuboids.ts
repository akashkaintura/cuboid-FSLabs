import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Id } from 'objection';
import { Bag, Cuboid } from '../models';

export const list = async (req: Request, res: Response): Promise<Response> => {
  const ids = req.query.ids as Id[];
  const cuboids = await Cuboid.query().findByIds(ids).withGraphFetched('bag');

  return res.status(200).json(cuboids);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id as Id;
  const cuboid = await Cuboid.query().findById(id).withGraphFetched('bag');

  if (!cuboid) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: 'The cuboid does not exist' });
  }

  return res.status(200).json(cuboid);
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { width, height, depth, bagId } = req.body;

  const bag = await Bag.query().findById(bagId).withGraphFetched('cuboids');
  if (!bag) {
    return res.status(HttpStatus.NOT_FOUND).json('Bag not found');
  }

  if (bag.availableVolume < width * height * depth) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      message: 'Insufficient capacity in bag',
    });
  }

  const cuboid = await Cuboid.query().insert({
    width,
    height,
    depth,
    bagId,
  });

  return res.status(HttpStatus.CREATED).json(cuboid);
};
