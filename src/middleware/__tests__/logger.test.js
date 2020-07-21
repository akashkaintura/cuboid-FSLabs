import logger from '../../logger';
import * as middleware from '../';

describe('logger middleware', () => {
  const next = jest.fn().mockResolvedValue(null);
  const loggerSpy = jest.spyOn(logger, 'log');

  afterEach(() => jest.clearAllMocks());

  it.each([
    ['error', 500],
    ['warn', 400],
    ['debug', 200],
  ])(
    'should set log level to %s on %i level requests',
    async (level, status) => {
      const ctx = { status, request: { body: '' } };
      await middleware.logger(ctx, next);
      expect(loggerSpy.mock.calls[0][0]).toBe(level);
    }
  );
});
