import Bag from '../Bag';

describe.each([
  ['no cuboids', [], 10, 0, 10],
  ['one cuboid', [{ width: 3, height: 2, depth: 3 }], 20, 18, 2],
  [
    'two cuboids',
    [
      { width: 1, height: 2, depth: 3 },
      { width: 1, height: 2, depth: 1 },
    ],
    10,
    8,
    2,
  ],
  [
    'three cuboids',
    [
      { width: 2, height: 2, depth: 2 },
      { width: 3, height: 3, depth: 3 },
      { width: 4, height: 4, depth: 4 },
    ],
    100,
    99,
    1,
  ],
])('Bag with %s', (_, cuboids, volume, payloadVolume, availableVolume) => {
  let bag;

  beforeAll(async () => {
    bag = await Bag.query().insert({
      volume,
      cuboids,
    });
  });

  it('should have volume', () => {
    expect(bag.volume).toBe(volume);
  });

  it('should have payloadVolume', () => {
    expect(bag.payloadVolume).toBe(payloadVolume);
  });

  it('should have availableVolume', () => {
    expect(bag.availableVolume).toBe(availableVolume);
  });
});
