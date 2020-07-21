import whitelist from '../whitelist';

it('should whitelist with one whitelist array', () => {
  const body = {
    id: '1',
    state: 'whatever',
  };

  const { id, ...expected } = body;

  const { body: result, type } = whitelist(body, { whitelist: ['state'] });

  expect(result).toEqual(expected);
  expect(type).toBe(null);
});

it('should whitelist and return a type if defined', () => {
  const body = {
    id: '1',
    state: 'whatever',
  };

  const { id, ...expected } = body;

  const { body: result, type } = whitelist(body, {
    type: 'transition',
    whitelist: ['state'],
  });

  expect(result).toEqual(expected);
  expect(type).toBe('transition');
});

it('should whitelist with a couple whitelist arrays', () => {
  const body = {
    description: 'this is heavy',
  };

  const expected = body;

  const { body: result, type } = whitelist(
    body,
    { whitelist: ['state'] },
    { whitelist: ['invoiceDate', 'description', 'archivedAt'] },
    { whitelist: ['description'] }
  );

  expect(result).toEqual(expected);
  expect(type).toBe(null);
});

it('should whitelist with no resulting fields', () => {
  const body = {
    favoriteStarWarsMovie: 'Revenge of the Sith',
  };

  const expected = {};

  const { body: result, type } = whitelist(
    body,
    { whitelist: ['state'] },
    { whitelist: ['invoiceDate', 'description', 'archivedAt'] }
  );

  expect(result).toEqual(expected);
  expect(type).toBe(null);
});

it('should filter out completely irrelevant field, but keep relevant one ', () => {
  const body = {
    favoriteStarWarsMovie: 'Revenge of the Sith',
    state: 'molten',
  };

  const { favoriteStarWarsMovie, ...expected } = body;

  const { body: result, type } = whitelist(
    body,
    { whitelist: ['state'] },
    { whitelist: ['invoiceDate', 'description', 'archivedAt'] }
  );

  expect(result).toEqual(expected);
  expect(type).toBe(null);
});
